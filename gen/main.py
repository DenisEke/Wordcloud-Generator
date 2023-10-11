from logging.config import dictConfig

import numpy as np
from flask import Flask
from flask import request
import time
from matplotlib.colors import LinearSegmentedColormap
from datetime import datetime, timedelta
import firebase_admin
from firebase_admin import credentials, firestore
from firebase_admin import storage
import matplotlib.pyplot as plt
from PIL import Image
import requests
import io
from custom_wordcloud_generator import WordCloud, ImageColorGenerator

# logging in to firebase
cred = credentials.Certificate('./serviceAccount.json')
firebase_admin.initialize_app(cred, {
    'storageBucket': 'wordcloud-gen.appspot.com'
})

# getting the firestore instance
db = firestore.client()

# flask is the framework used
app = Flask(__name__)

# sets logging level to info
dictConfig({
    'version': 1,
    'formatters': {'default': {
        'format': '[%(asctime)s] %(levelname)s in %(module)s: %(message)s',
    }},
    'handlers': {'wsgi': {
        'class': 'logging.StreamHandler',
        'stream': 'ext://flask.logging.wsgi_errors_stream',
        'formatter': 'default'
    }},
    'root': {
        'level': 'INFO',
        'handlers': ['wsgi']
    }
})


# a test route to verify this is up and running
@app.route('/test')
def test():
    return 'Seems to be up'


# a test route to verify this is up and running
@app.route('/')
def default():
    return 'Default root is up'


# this route is called to generate the preview picture
@app.route('/generate', methods=['POST'])
def generate():
    # get the request params as json
    content = request.json
    # validate if a jobID is in the params
    if 'id' not in content:
        return "you have to specify the id"

    app.logger.info('got a request to generate (new generation process) with this id %s', content['id'])

    # get the jobs details from firestore
    previewRef = db.collection('previews').document(content['id'])
    preview = previewRef.get();

    # validate that the job exists
    if preview.exists == False:
        app.logger.error('job with id %s not found', content['id'])
        return "couldn't find the job"

    # transform the job
    preview = preview.to_dict();
    app.logger.info('found the job with following params: %s', preview)

    # update status to preprocessing
    previewRef.set({
        'status': 2
    }, merge=True)

    # transforms the word array from the job into a python dictionary
    frequencies = {};
    for i in preview['words']:
        frequencies[i['word']] = float(i['value'])

    # defaults some values
    if 'maxFontSize' not in preview:
        preview['maxFontSize'] = 100
    if 'maxWords' not in preview:
        preview['maxWords'] = 200
    if 'minFontSize' not in preview:
        preview['minFontSize'] = 4
    if 'fontStep' not in preview:
        preview['fontStep'] = 1
    if 'scale' not in preview:
        preview['scale'] = 1
    if 'backgroundColor' not in preview:
        preview['backgroundColor'] = None
    if not preview['backgroundColor']:
        preview['backgroundColor'] = None
    if 'mode' not in preview:
        preview['mode'] = "RGBA"
    # if no words where given set words to no words given
    if len(frequencies) == 0:
        frequencies['no'] = 10
        frequencies['words'] = 10
        frequencies['given'] = 10

    # color setup
    if len(preview["colors"]) == 0:
        preview['colors'] = plt.get_cmap("hot")
    else:
        # complicated color scheme generation
        colors = preview['colors']

        # it wasn't able to create a color scheme with one color but this fixes it by doubling the color
        if len(colors) == 1:
            colors.append(colors[0])

        n_bin = len(colors)
        # Create the colormap
        cm = LinearSegmentedColormap.from_list(
            content['id']+"cmap", colors, N=n_bin)
        preview['colors'] = cm

    # Font setup
    if 'fontLink' not in preview:
        # Load font from URI
        r = requests.get(
            'http://fonts.gstatic.com/s/yellowtail/v10/OZpGg_pnoDtINPfRIlLotlzNwED-b4g.ttf',
            allow_redirects=True)
        preview['font'] = r.content
    else:
        # Load font from URI
        r = requests.get(
            preview['fontLink'],
            allow_redirects=True)
        preview['font'] = r.content

    # stores the time at the beginning of the generation
    start = time.time();

    preview['height'] = 720
    preview['width'] = 720

    # Mask setup
    if 'mask' in preview:
        response = requests.get(preview['mask'])
        mask_img = Image.open(io.BytesIO(response.content)).convert("RGBA")
        whiteBackground = Image.new("RGBA", mask_img.size, "WHITE").convert("RGBA")  # Create a white rgba background
        whiteBackground.paste(mask_img, (0, 0), mask_img)
        whiteBackground = whiteBackground.resize((preview['width'], preview['height']))
        preview['mask'] = np.array(whiteBackground)
    else:
        preview['mask'] = None

    # update status to generating
    previewRef.set({
        'status': 3
    }, merge=True)

    #clamp settings
    preview["width"]=clamp(preview["width"],0,4000)
    preview["height"]=clamp(preview["height"],0,4000)
    preview["maxWords"]=clamp(preview["height"],0,1000)
    preview["maxWords"]=clamp(preview["height"],0,1000)
    preview["minFontSize"]=clamp(preview["minFontSize"],0,99)
    preview["maxFontSize"]=clamp(preview["maxFontSize"],0,100)
    preview["fontStep"]=clamp(preview["fontStep"],0,100)
    preview["scale"]=clamp(preview["scale"],0,5)

    # Generate a word cloud image
    wordcloud = WordCloud(width=preview["width"],
                          mask=preview['mask'],
                          font_path=preview['font'],
                          height=preview["height"],
                          max_words=preview["maxWords"],
                          repeat=preview["repeat"],
                          min_font_size=preview['minFontSize'],
                          max_font_size=preview['maxFontSize'],
                          font_step=preview['fontStep'],
                          scale=preview["scale"],
                          background_color=preview['backgroundColor'],
                          mode=preview['mode'],
                          colormap=preview['colors'],
                          ).generate_from_frequencies(frequencies)

    # calculates how long the generation took and logs the time
    end = time.time();
    app.logger.info('it took %s seconds to generate the wordcloud.', str(end - start))

    # update status to coloring and adds the generation duration
    previewRef.set({
        'status': 4,
        'duration': end - start
    }, merge=True)

    # colors the wordcloud according to mask if specified
    if 'maskColor' in preview:
        if preview['maskColor'] == True:
            image_colors = ImageColorGenerator(preview['mask'])
            wordcloud.recolor(color_func=image_colors)

    # this makes a bucket (folder) for it
    bucket = storage.bucket()

    # save as svg
    # creates an svg
    svg = wordcloud.to_svg(embed_font=True)

    # this creates the file
    svgBlob = bucket.blob('generated/svg/' + content["id"] + ".svg")
    # this uploads the svg
    svgBlob.upload_from_string(svg, content_type='image/svg+xml')

    # returns an url from which the file can be downloaded
    svgUrl = svgBlob.generate_signed_url(expiration=(datetime.now() + timedelta(days=100000)));

    # transform the cloud to an image
    img = wordcloud.to_image()
    url = addImageWithSize((720, 720), img, bucket, "generated/png/" + content['id'])



    # update status to finished
    previewRef.set({
        'status': 5,
        'path': url,
    }, merge=True)

    #save the svg to another collection so the user can't access it.
    #NOTE: I thougt of the solution to query the backend from the frontend
    # and filter this out but this will not allow firebase to communicate with the frontend when something changes
    # this is the less painful way maybe not elegant but intelligent!
    db.collection('generated').document(content['id']).set({'svg':svgUrl})

    return "Preview generated successfully"


def addImageWithSize(size, orgimg, bucket, path):
    img = orgimg.resize(size)

    # this part is what I don't fully understand
    # this should make an in-memory file like in RAM
    bytes = io.BytesIO()
    # this saves the image to this in memory file
    img.save(bytes, format='PNG')
    # this is what I fully don't get. When I leave this line out I can't upload the file because it says stream needs to be
    # at the beginning so this somehow has to set the stream to the beginning
    bytes.seek(0)

    # upload the image
    # this creates the file
    blob = bucket.blob(path + '.png')
    # this uploads my in memory file
    blob.upload_from_file(
        bytes
    )

    # returns an url from which the file can be downloaded
    signedUrl = blob.generate_signed_url(expiration=(datetime.now() + timedelta(weeks=500)));
    return signedUrl

# i think this is pythons way of calling the main function
if __name__ == '__main__':
    app.run()

#holds a number in a range
def clamp(n, minn, maxn):
    return max(min(maxn, n), minn)
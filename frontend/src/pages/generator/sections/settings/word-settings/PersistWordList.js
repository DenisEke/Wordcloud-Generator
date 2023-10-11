import React, {useContext, useState} from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {WordsContext} from "../../../../../providers/WordsProvider";
import Typography from "@material-ui/core/Typography";
import Alert from "../../../../../components/pops/Alert";
import Snackbar from "@material-ui/core/Snackbar";


export default function PersistWordlist(props) {

    const [file, setFile] = useState();
    const [failed, setFailed] = useState();
    const wordsContext = useContext(WordsContext);

    function handleFile(event) {
        setFile(event.target.files[0]);
    }

    async function upload() {

        if (!file) {
            return setFailed("You have to choose a file.")
        }

        const reader = new FileReader();
        reader.onload = async (e) => {
            const text = (e.target.result);
            const words = JSON.parse(text);

            if (!words.length) {
                console.log("length");
                setFailed("The json is not in the correct format. The generator needs an array of objects with the 'value' and 'word' keys.");
                return;
            }

            for (let i = 0; i < words.length; i++) {
                if (!words[i].value) {
                    console.log("value " + i);
                    setFailed("The json is not in the correct format. The generator needs an array of objects with the 'value' and 'word' keys.");
                    return;
                }
                if (!words[i].word) {
                    console.log("word" + i);
                    setFailed("The json is not in the correct format. The generator needs an array of objects with the 'value' and 'word' keys.");
                    return;
                }
            }

            wordsContext.set(words);


        };
        reader.readAsText(file)

    }

    async function download() {

        const fileName = "your_wordlist";
        const json = JSON.stringify(wordsContext.words);
        const blob = new Blob([json], {type: 'application/json'});
        const href = await URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = fileName + ".json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Grid item xs={12}>
                    <Typography id="maxWordsSlider" gutterBottom variant={"h6"}>
                        Upload / Download Wordlists
                    </Typography>
                </Grid>
            </Grid>
            <Grid item xs={4}>
                <Button
                    variant="outlined"
                    component="label"
                    fullWidth
                >
                    {file ? file.name : "Choose wordlist to upload"}
                    <input
                        onChange={handleFile}
                        type="file"
                        style={{display: "none"}}
                        accept="application/JSON"
                    />
                </Button>
            </Grid>
            <Grid item xs={4}>
                <Button variant={"contained"} fullWidth color={"primary"} onClick={upload}>Upload a wordlist</Button>
            </Grid>
            <Grid item xs={4}>
                <Button variant={"outlined"} fullWidth color={"secondary"} onClick={download}>Download the
                    wordlist</Button>
            </Grid>
            <Snackbar open={failed} anchorOrigin={{
                vertical: 'top',
                horizontal: 'center'
            }} autoHideDuration={10000} onClose={() => {
                setFailed(null)
            }}>
                <Alert severity="error" onClose={() => {
                    setFailed(null)
                }}>
                    {failed}</Alert>
            </Snackbar>
        </Grid>
    )

}
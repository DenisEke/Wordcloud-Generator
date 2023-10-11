import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as firebase from "firebase-admin";
import {params} from "./firebase/firebase.config";

async function bootstrap() {

    if (!firebase.apps.length) {
        firebase.initializeApp({
            credential: firebase.credential.cert(params),
            storageBucket: 'wordcloud-gen.appspot.com',
        });
    }

    const app = await NestFactory.create(AppModule, {bodyParser: false});
    app.enableCors();
    const PORT = Number(process.env.PORT) || 8080;
    await app.listen(PORT);
}

bootstrap();

import {Injectable, Logger} from '@nestjs/common';
import Preview from "./preview.dto";
import * as firebase from 'firebase-admin';
import axios from "axios";
import {config} from "../config/config";

@Injectable()
export class PreviewService {

    private readonly logger = new Logger(PreviewService.name);

    private readonly firestore;

    constructor() {

        this.firestore = firebase.firestore();
    }

    async createPreview(preview: Preview) {

        let previewDoc = await this.firestore.collection('previews').add({
            uid: preview.uid, ...preview.generatorParams,
            status: 1,
            created: new Date()
        });
        this.logger.log("Created a new preview entry with the id " + previewDoc.id);

        this.handleGeneration(previewDoc.id);

        return previewDoc.id;
    }

    async handleGeneration(id: string) {

        try {
            await axios.post(config.GENERATOR + "generate", {
                id: id
            });
        } catch (error) {


            await this.firestore.collection('previews').doc(id).set({status: 6}, {merge: true});
            this.logger.error("A preview failed. ID: " + id);
        }

    }

}

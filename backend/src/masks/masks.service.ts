import {Injectable, Logger} from "@nestjs/common";
import * as firebase from "firebase-admin";

@Injectable()
export class MasksService {

    private readonly logger = new Logger(MasksService.name);
    private readonly db;

    constructor() {

        this.db = firebase.firestore();
    }

    async createCategory(name: string, desc: string) {
        await this.db.collection('maskCollections').add({name: name, desc: desc});
    }

    async addMaskToCollection(path: string, category: string) {
        await this.db.collection('masks').add({path: path, collection: category});
    }

}
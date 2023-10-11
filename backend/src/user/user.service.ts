import {HttpException, HttpStatus, Injectable, Logger} from '@nestjs/common';
import * as firebase from "firebase-admin";

@Injectable()
export class UserService {

    private readonly logger = new Logger(UserService.name);

    private readonly firestore;

    constructor() {

        this.firestore = firebase.firestore();
    }

    async addPromotion(uid: string) {

        const promo = await this.firestore.collection("users").doc(uid).collection("payments").doc("promo").get();

        if (promo.exists) {
            throw new HttpException("You already got your promotion", HttpStatus.FORBIDDEN);
            return;
        }

        await this.firestore.collection("users").doc(uid).collection("payments").doc("promo")
            .set({
                price: 0,
                amount: 5,
                created: new Date(),
                description: "You received a promotion of 5 premium downloads",
            })
    }

    async addMaskToUser(path: string, uid: string) {
        await this.firestore.collection('users').doc(uid).collection("masks").add({path: path});
    }

    /*
    TODO: also delete the mask in storage
     */
    async removeMaskFromUser(mask: string, user: string) {
        await this.firestore.collection('users').doc(user).collection("masks").doc(mask).delete();
    }

    async getUserMasks(uid: string) {
        let masksSnapshot = await this.firestore.collection('users').doc(uid).collection("masks").get();
        let masks = [];
        masksSnapshot.forEach(doc => {
            const data = doc.data();
            masks.push({path: data.path, id: doc.id});
        });
        return masks;
    }

    async getAvailableDownloadsFor(uid): Promise<number> {
        let snapshot = await this.firestore.collection('users').doc(uid).collection("payments").get();
        let downloadsLeft = 0;
        snapshot.forEach(doc => {
            downloadsLeft += doc.data().amount;
        });

        return downloadsLeft;
    }

}

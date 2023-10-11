import {Injectable, Logger} from '@nestjs/common';
import * as firebaseConfig from "../serviceAccount.json";
import * as firebase from "firebase-admin";

const params = {
    type: firebaseConfig.type,
    projectId: firebaseConfig.project_id,
    privateKeyId: firebaseConfig.private_key_id,
    privateKey: firebaseConfig.private_key,
    clientEmail: firebaseConfig.client_email,
    clientId: firebaseConfig.client_id,
    authUri: firebaseConfig.auth_uri,
    tokenUri: firebaseConfig.token_uri,
    authProviderX509CertUrl: firebaseConfig.auth_provider_x509_cert_url,
    clientC509CertUrl: firebaseConfig.client_x509_cert_url
};

@Injectable()
export class StorageService {

    private readonly logger = new Logger(StorageService.name);
    private bucket;

    constructor() {

        this.bucket = firebase.storage().bucket();
    }

    async uploadFile(file, path: string) {

        const blob = this.bucket.file(path);

        await blob.save(file);

        const url = await blob.getSignedUrl({
            action: 'read',
            expires: '12-12-3000'
        });

        return url[0];
    }

    async uploadUserMask(file, user: string,): Promise<string> {
        this.logger.debug("uploading file: ", file);
        const blob = this.bucket.file("masks/user/" + user + "_" + file.originalname);
        const res = await blob.save(file.buffer);
        //TODO: it should never expire!
        const url = await blob.getSignedUrl({
            action: 'read',
            expires: '12-12-3000'
        });

        return url[0];
    }

    async uploadAdminMask(file, category: string): Promise<string> {
        this.logger.debug("uploading file: ", file);
        const blob = this.bucket.file("masks/admin/" + category + "/" + file.originalname);
        const res = await blob.save(file.buffer);
        //TODO: it should never expire!
        const url = await blob.getSignedUrl({
            action: 'read',
            expires: '01-01-3000'
        });

        return url[0];
    }

}

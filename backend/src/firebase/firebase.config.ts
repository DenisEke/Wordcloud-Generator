import * as firebaseConfig from "../serviceAccount.json";

export const params = {
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
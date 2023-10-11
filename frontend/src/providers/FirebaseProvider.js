import React, {createContext} from "react";
import {config} from "../Constants";
import * as firebase from "firebase";

/*
NOTE: I decided to put firebase in a provider because
you need to initialize the app and then get your auth and firestore from there
and I thought that this will force me to import this and not accidently
from the base package
 */

export const FirebaseContext = createContext();

firebase.initializeApp(config.firebase);

const firestore = firebase.firestore();
const auth = firebase.auth();
firebase.analytics();
const provider = new firebase.auth.GoogleAuthProvider();

export default function FirebaseProvider(props) {


    return (
        <FirebaseContext.Provider value={{
            auth: auth,
            firestore: firestore,
            provider: provider
        }}>
            {props.children}
        </FirebaseContext.Provider>
    )

}
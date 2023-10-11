import React, {createContext, useContext, useEffect, useState} from "react";
import {ColorContext} from "./ColorsProvider";
import {WordsContext} from "./WordsProvider";
import {SettingsContext} from "./SettingsProvider";
import {MaskContext} from "./MaskProvider";
import {FontContext} from "./FontProvider";
import {UserContext} from "./UserProvider";
import axios from "axios";
import {config} from "../Constants";
import {FirebaseContext} from "./FirebaseProvider";

export const JobContext = createContext();

export default function JobProvider(props) {

    const firestore = useContext(FirebaseContext).firestore;

    const [id, setId] = useState("Gjrmm6rg4DbJ3MR0Dsjw");
    const [preview, setPreview] = useState("https://source.unsplash.com/random");
    const [status, setStatus] = useState(5);
    const [duration, setDuration] = useState();
    const [ready, setReady] = useState(false);

    const user = useContext(UserContext);

    const wordsContext = useContext(WordsContext);
    const fontContext = useContext(FontContext);
    const maskContext = useContext(MaskContext);
    const colorContext = useContext(ColorContext);
    const settingsContext = useContext(SettingsContext);

    let unsubscribe;

    useEffect(() => {

        if (unsubscribe) {
            unsubscribe();
        }

        unsubscribe = firestore.collection("previews").doc(id)
            .onSnapshot(function (doc) {
                const data = doc.data();
                setStatus(data.status);
                setPreview(data.path);
                setDuration(data.duration);

                wordsContext.set(data.words);
                colorContext.set(data.colors);
                maskContext.set(data.maskId, data.maskColor);
                fontContext.set([data.maxFontSize, data.minFontSize], data.fontStep, data.fontIndex, data.fontTypeIndex);

                settingsContext.set({
                    "maxWords": data.maxWords,
                    "repeat": data.repeat,
                    "mode": data.mode,
                    "backgroundColor": data.backgroundColor
                });

                setReady(true);
            });

        return () => unsubscribe();
    }, [id]);

    async function generate() {
        setStatus(0);
        const response = await axios.post(config.backendUrl + "preview", {
            generatorParams: getRequest(),
            uid: user ? user.uid : null
        });
        console.log(response);
        setId(response.data);
    }

    function set(newId) {
        setReady(false);
        setId(newId);
    }

    function getRequest() {
        return {
            ...settingsContext.settings,
            colors: colorContext.colors,
            words: wordsContext.words, ...fontContext.getSettings(), ...maskContext.getParams()
        }
    }

    return (
        <JobContext.Provider
            value={
                {
                    duration: duration,
                    set: set,
                    ready: ready,
                    generate: generate,
                    preview: preview,
                    status: status,
                    id: id,
                }
            }
        >
            {props.children}
        </JobContext.Provider>
    )

}
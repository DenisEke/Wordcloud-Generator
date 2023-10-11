import React, {createContext, useContext, useEffect, useState} from "react";
import {UserContext} from "./UserProvider";
import {config} from "../Constants";
import axios from "axios";
import firebase from "firebase";

const firestore = firebase.firestore();
export const MaskContext = createContext();

function MaskProvider(props) {

    const user = useContext(UserContext);
    const [masks, setMasks] = useState([]);
    const [selected, setSelected] = useState(null);
    const [useMaskColor, setUseMaskColor] = useState(true);

    useEffect(function () {

        updateMasks();

    }, [setMasks, user]);

    function set(selected, useMaskColor) {
        setSelected(selected);//this is going to be harder
        setUseMaskColor(useMaskColor);
    }

    async function updateMasks() {
        const masks = await getMasks();
        if (user) {
            const res = await axios.get(config.backendUrl + "masks/" + user.uid);
            masks.push({name: "Your Masks", desc: "The masks you uploaded", id: "masks_" + user.uid, masks: res.data});
        }
        setMasks(masks);
    }

    function getParams() {
        if (selected) {
            return {
                mask: getPathById(selected),
                maskColor: useMaskColor,
                maskId: selected,
            }
        }

    }

    function getPathById(id) {
        for (let i = 0; i < masks.length; i++) {
            for (let j = 0; j < masks[i].masks.length; j++) {
                if (masks[i].masks[j].id === id) {
                    return masks[i].masks[j].path;
                }
            }
        }
    }

    function changeUseMaskColor() {
        setUseMaskColor(!useMaskColor);
    }

    function selectMask(mask) {
        if (selected === mask.id) {
            setSelected(null);
            return;
        }
        setSelected(mask.id);
    }

    async function getMasks() {

        const maskCollections = await firestore.collection("maskCollections").get();
        const masks = await firestore.collection("masks").get();

        const json = [];

        maskCollections.forEach((doc) => {

            const name = doc.data().name;
            const id = doc.id;
            const desc = doc.data().desc;
            let masksForCollection = [];

            masks.forEach((doc) => {
                const data = doc.data();
                if (data.collection === id) {
                    const maskName = data.name;
                    const path = data.path;
                    masksForCollection.push({name: maskName, path: path, id: doc.id})
                    //TODO: remove it from the masks array
                }
            });

            json.push({name: name, desc: desc, id: id, masks: masksForCollection});

        });

        return json;
    }

    return (
        <MaskContext.Provider value={{
            set: set,
            masks: masks,
            selectMask: selectMask,
            selected: selected,
            getParams: getParams,
            useMColor: useMaskColor,
            changeUseMaskColor: changeUseMaskColor,
            updateMasks: updateMasks
        }}>
            {props.children}
        </MaskContext.Provider>
    )

}

export default MaskProvider;
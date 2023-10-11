import React, {createContext, useContext, useState} from "react";
import {WordsContext} from "./WordsProvider";

export const SettingsContext = createContext();

function SettingsProvider(props) {

    const wordContext = useContext(WordsContext);
    const [settings, setSettings] = useState({});

    console.log(settings);

    function set(_settings) {
        setSettings(_settings);
    }

    function changeSetting(key, value) {

        if (value === null) {
            let tempSettings = settings;
            delete tempSettings[key];
            setSettings(tempSettings);
            return;
        }

        if (key === "maxWords") {
            if (value >= wordContext.words.length) ;
            {
                setSettings({...settings, [key]: value, "repeat": true});
                return;
            }
        }

        setSettings({...settings, [key]: value});
    }

    return (
        <SettingsContext.Provider value={{settings: settings, changeSetting: changeSetting, set: set}}>
            {props.children}
        </SettingsContext.Provider>
    )

}

export default SettingsProvider;
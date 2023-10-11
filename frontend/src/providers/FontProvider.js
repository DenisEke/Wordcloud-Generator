import React, {createContext, useEffect, useState} from "react";
import axios from "axios";
import {config} from "../Constants";

export const FontContext = createContext();

function FontProvider(props) {

    const [fonts, setFonts] = useState([]);
    const [fontSize, setFontSize] = useState([4, 100]);
    const [fontStep, setFontStep] = useState(1);
    const [font, setFont] = useState(0);
    const [fontType, setFontType] = useState(0);

    function set(fontSize, fontStep, font, fontType) {
        setFontSize(fontSize);
        setFontStep(fontStep);
        setFont(font);
        setFontType(fontType);
    }

    useEffect(() => {
        async function getFonts() {
            const result = await axios(
                config.backendUrl + "fonts",
            );
            setFonts(result.data);
            setFontType(0);

            result.data.forEach((item) => {
                var link = document.createElement("link");
                link.setAttribute("rel", "stylesheet");
                link.setAttribute("type", "text/css");
                link.setAttribute("href", "http://fonts.googleapis.com/css?family=" + item.family);
                document.getElementsByTagName("head")[0].appendChild(link)
            })
        }
        getFonts();
    }, [setFonts]);


    function changeFont(fontId) {
        setFont(fontId);
        setFontType(0);
    }

    function changeFontType(_fontType) {
        setFontType(_fontType);
    }

    const changeSize = (event, newValue) => {
        setFontSize(newValue);
    };

    const changeStep = (event, newValue) => {
        setFontStep(newValue);
    };

    function getSettings() {

        const fontLink = fonts[font].files[fonts[font].variants[fontType]];

        let result = {
            "fontLink": fontLink,
            "fontVariant": fonts[font].variants[fontType],
            "fontFamily": fonts[font].family,
            "minFontSize": Math.min(...fontSize),
            "maxFontSize": Math.max(...fontSize),
            "fontIndex": font,
            "fontTypeIndex": fontType,
            "fontStep": fontStep,
        };

        return result;
    }

    return (
        <FontContext.Provider value={{
            set: set,
            fonts: fonts,
            font: font,
            fontStep: fontStep,
            fontSize: fontSize,
            fontType: fontType,
            changeFontType: changeFontType,
            changeStep: changeStep,
            changeFont: changeFont,
            changeSize: changeSize,
            getSettings: getSettings
        }}>
            {props.children}
        </FontContext.Provider>
    )

}

export default FontProvider;
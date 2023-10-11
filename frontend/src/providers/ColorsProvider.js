import React, {createContext, useState} from "react";

export const ColorContext = createContext();

function ColorProvider(props) {

    const [colors, setColors] = useState(
        [
            "#73071F",
            "#151624",
            "#3F4D59",
            "#77858D"
        ]
    );

    function set(colors) {
        setColors(colors);
    }

    function addColor(color) {

        if (colors.includes(color)) {
            return;
        }

        setColors(colors.concat(color).sort());
    }

    function removeColor(color) {
        setColors(colors.filter(c => !(c == color)));
    }

    return (
        <ColorContext.Provider value={{colors: colors, addColor: addColor, removeColor: removeColor, set: set}}>
            {props.children}
        </ColorContext.Provider>
    )

}

export default ColorProvider;
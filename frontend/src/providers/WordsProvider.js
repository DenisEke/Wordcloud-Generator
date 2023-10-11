import React, {createContext, useState} from "react";
import axios from "axios";
import {config} from "../Constants";
import {DEFAULT_WORDLIST} from "../DefaultWordlists"

export const WordsContext = createContext();

function WordsProvider(props) {

    const [words, setWords] = useState(DEFAULT_WORDLIST);

    function sort(key) {
        const temp = [...words.sort(function (a, b) {
            var x = a[key];
            var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        })];
        setWords(temp);
    }

    function set(words) {
        setWords([...words]);
    }

    async function save(name, uid) {
        return (await axios.post(config.backendUrl + "wordlists", {name: name, words: words, uid: uid})).data;
    }

    function add(wordValuePair) {
        for (let i = 0; i < words.length; i++) {
            if (words[i].word === wordValuePair.word) {
                alert("the word that you are trying to add already exists");
                return;
            }
        }

        const temp = words;
        temp.push(wordValuePair);
        setWords(temp);
    }

    function remove(word) {

        const temp = words.filter((item) => item.word !== word);
        setWords(temp);

    }

    function edit(oldWord, newWord) {

        const temp = words;


        for (let i = 0; i < temp.length; i++) {
            if (temp[i].word === oldWord) {
                temp[i] = newWord;
            }
        }

        setWords(temp);
    }

    return (
        <WordsContext.Provider value={{
            words: words,
            set: set,
            save: save,
            add: add,
            remove: remove,
            edit: edit,
            sort: sort
        }}>
            {props.children}
        </WordsContext.Provider>
    )

}

export default WordsProvider;
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React, {useContext, useState} from "react";
import {WordsContext} from "../../../../../providers/WordsProvider";
import Typography from "@material-ui/core/Typography";

export default function EasyWords(props) {

    const wordsContext = useContext(WordsContext);
    const [easyWords, setEasyWords] = useState();

    function handleEasyWordsChange(event) {
        setEasyWords(event.target.value);
    }

    function easyAdd(replace) {
        const rawWords = easyWords.match(/\b(\w+)'?(\w+)?\b/g);

        const words = [];
        rawWords.forEach((raw) => words.push({word: raw, value: 1}));


        if (replace) {
            wordsContext.set([...words]);
        } else {
            wordsContext.set([...words, ...wordsContext.words])
        }
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography id="maxWordsSlider" gutterBottom variant={"h6"}>
                    Easily add words:
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField multiline rows={10}
                           placeholder="You can paste a text here and let the generator extract the words from it."
                           value={easyWords}
                           onChange={handleEasyWordsChange}
                           variant="outlined" size="small"
                           fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <Button variant="contained" color="primary" fullWidth onClick={() => easyAdd(true)}>
                            Replace words
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" color="secondary" fullWidth onClick={() => easyAdd(false)}>
                            Add words
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
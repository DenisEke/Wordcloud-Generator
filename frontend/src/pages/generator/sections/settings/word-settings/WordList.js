import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import React, {useContext, useState} from "react";
import {WordsContext} from "../../../../../providers/WordsProvider";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import HelpIcon from '@material-ui/icons/Help';
import Tooltip from "@material-ui/core/Tooltip";

export default function WordList(props) {

    const wordsContext = useContext(WordsContext);

    const [edited, setEdited] = useState();
    const [create, setCreate] = useState();

    function remove(word) {
        wordsContext.remove(word);
    }

    function edit(word, value) {
        setEdited({oldWord: word, word: word, value: value});
    }

    function changeWord(word, value) {

        wordsContext.edit(edited.oldWord, {word: word, value: value});
        setEdited(null);
    }

    function onCreate() {
        if (create.word !== "") {
            wordsContext.add(create);
            setCreate({word: "", value: 1});
            return;
        }
        setCreate(null);

    }

    return (
        <Grid container spacing={1}>
            <br/>
            <Grid item xs={12}>
                <Typography id="maxWordsSlider" gutterBottom variant={"h6"}>
                    Word list
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant={"body1"}>
                    The words the generator will use. Words with higher values will come more often and will be
                    represented bigger.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={1}>
                    <Grid item xs={5}>
                        <Grid container onClick={() => wordsContext.sort("word")}>
                            <Grid item xs={10}>
                                <Typography variant="body1" fullWidth>Word</Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <Tooltip title="The word to use. Click to sort by words." arrow>
                                    <HelpIcon color={"secondary"}/>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={1}></Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={5}>
                        <Grid container onClick={() => wordsContext.sort("value")}>
                            <Grid item xs={10}>
                                <Typography variant="body1" fullWidth>Value</Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <Tooltip
                                    title="Click to sort by value. Value determines the weight of a word. Words with higher values will be drawn more often and will be bigger."
                                    arrow>
                                    <HelpIcon color={"secondary"}/>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={1}></Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="body1" fullWidth>Actions</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={1} style={{maxHeight: 500, overflow: 'auto'}}>
                    {
                        wordsContext.words.map((word) =>
                            edited ? (
                                    word.word === edited.oldWord ?
                                        <EditedWord word={word.word} value={word.value} onChange={changeWord}
                                                    remove={remove}
                                                    key={"editedWord"}/>
                                        :
                                        <IdleWord word={word.word} value={word.value} edit={edit} remove={remove}
                                                  key={word.word + word.value + "idle"}/>) :
                                <IdleWord word={word.word} value={word.value} edit={edit} remove={remove}
                                          key={word.word + word.value + "idle"}/>
                        )
                    }
                    {
                        create ? <Grid item xs={12}>
                            <Grid container spacing={1} alignItems="center"
                                  justify="center">
                                <Grid item xs={5}>
                                    <TextField variant="outlined" size="small"
                                               fullWidth value={create.word}
                                               autoFocus
                                               onKeyDown={(e) => {
                                                   if (e.key === "Enter") {
                                                       onCreate();
                                                   }
                                               }}
                                               onChange={(event) => {
                                                   setCreate({word: event.target.value, value: create.value})
                                               }}
                                    />
                                </Grid>
                                <Grid item xs={5}>
                                    <TextField variant="outlined" size="small"
                                               fullWidth value={create.value}
                                               onKeyDown={(e) => {
                                                   if (e.key === "Enter") {
                                                       onCreate();
                                                   }
                                               }}
                                               onChange={(event) => {
                                                   setCreate({word: create.word, value: event.target.value})
                                               }}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <ButtonGroup variant="contained" disableElevation>
                                        <IconButton aria-label="delete" color="primary" size={"small"}
                                                    onClick={() => setCreate(null)}>
                                            <CloseIcon/>
                                        </IconButton>
                                        <IconButton aria-label="delete" color="secondary" size={"small"}
                                                    onClick={onCreate}>
                                            <CheckIcon/>
                                        </IconButton>
                                    </ButtonGroup>
                                </Grid>
                            </Grid>
                        </Grid> : null
                    }
                </Grid>

                {
                    create ? null : <Grid item xs={12}>
                        <IconButton onClick={() => setCreate({word: "", value: 1})} color={"primary"}
                                    variant={"contained"}><AddIcon/></IconButton>
                    </Grid>}
            </Grid>
        </Grid>
    )

}

function EditedWord(props) {

    const [word, setWord] = useState(props.word);
    const [value, setValue] = useState(props.value);

    return (
        <Grid item xs={12}>
            <Grid container spacing={1} alignItems="center"
                  justify="center">
                <Grid item xs={5}>
                    <TextField variant="outlined" size="small"
                               fullWidth value={word}
                               autoFocus
                               onChange={(event) => setWord(event.target.value)}
                               onKeyDown={(e) => {
                                   if (e.key === "Enter") {
                                       props.onChange(word, value);
                                   }
                               }}
                    />
                </Grid>
                <Grid item xs={5}>
                    <TextField variant="outlined" size="small"
                               fullWidth value={value}
                               onChange={(event) => setValue(event.target.value)}
                               onKeyDown={(e) => {
                                   if (e.key === "Enter") {
                                       props.onChange(word, value);
                                   }
                               }}
                    />
                </Grid>
                <Grid item xs={2}>
                    <ButtonGroup variant="contained" disableElevation>
                        <IconButton aria-label="delete" onClick={() => props.remove(word)}
                                    color="primary" size={"small"}>
                            <DeleteIcon/>
                        </IconButton>
                        <IconButton aria-label="delete"
                                    onClick={() => props.onChange(word, value)}
                                    color="secondary" size={"small"}>
                            <CheckIcon/>
                        </IconButton>
                    </ButtonGroup>
                </Grid>
            </Grid>
        </Grid>
    )
}

function IdleWord(props) {
    const {word, value} = props;

    return (
        <Grid item xs={12}>
            <Grid container spacing={1} alignItems="center"
                  justify="center">
                <Grid item xs={5}>
                    <TextField variant="outlined" size="small"
                               fullWidth value={word}
                               disabled={true}
                    />
                </Grid>
                <Grid item xs={5}>
                    <TextField variant="outlined" size="small"
                               disabled={true}
                               fullWidth value={value}
                    />
                </Grid>
                <Grid item xs={2}>
                    <ButtonGroup variant="contained" disableElevation>
                        <IconButton aria-label="delete" onClick={() => props.remove(word)}
                                    color="primary" size={"small"}>
                            <DeleteIcon/>
                        </IconButton>
                        <IconButton aria-label="delete"
                                    onClick={() => props.edit(word, value)}
                                    color="secondary" size={"small"}>
                            <EditIcon/>
                        </IconButton>
                    </ButtonGroup>
                </Grid>
            </Grid>
        </Grid>
    )
}
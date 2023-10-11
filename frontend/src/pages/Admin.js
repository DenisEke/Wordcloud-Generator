import React, {useContext, useState} from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import {MaskContext} from "../providers/MaskProvider";
import {config as appConfig} from "../Constants";
import {post} from "axios";
import MaskSelector from "./generator/sections/settings/mask-settings/MaskSelector";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";


export default function Admin(props) {

    const maskContext = useContext(MaskContext);

    const [category, setCategory] = useState();
    const [files, setFiles] = useState();

    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");

    function handleFile(event) {
        setFiles(event.target.files);
    }

    function handleCategory(event) {
        setCategory(event.target.value);
    }

    async function uploadFile() {
        const url = appConfig.backendUrl + "masks/admin";
        const formData = new FormData();

        for (let i = 0; i < files.length; i++) {
            formData.append(`images[${i}]`, files[i])
        }
        formData.append('category', category);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        const res = await post(url, formData, config);
        maskContext.updateMasks();
        console.log(res);
    }

    async function createCategory() {
        const url = appConfig.backendUrl + "masks/category";
        const res = await post(url, {name: name, desc: desc});

        maskContext.updateMasks();
    }

    function handleName(event) {
        setName(event.target.value);
    }

    function handleDesc(event) {
        setDesc(event.target.value);
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <Paper className={"padding"}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography>Create mask category</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField variant={"outlined"} placeholder={"Name"} fullWidth value={name}
                                       onChange={handleName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField variant={"outlined"} multiline rows={2} placeholder={"Description"} fullWidth
                                       value={desc}
                                       onChange={handleDesc}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant={"outlined"} fullWidth onClick={createCategory}>Create category</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <MaskSelector/>
            </Grid>
            <Grid item xs={6}>
                <Paper className={"padding"}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography>Upload your own Mask</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel id="maskCategorySelectionLabel">Choose a category for the mask:</InputLabel>
                                <Select
                                    variant="outlined"
                                    label="Choose a category for the mask"
                                    labelId="maskCategorySelectionLabel"
                                    id="maskCategorySelection"
                                    value={category}
                                    onChange={handleCategory}
                                >
                                    {
                                        maskContext.masks.map((maskCategory) =>
                                            <MenuItem key={maskCategory.id}
                                                      value={maskCategory.id}>{maskCategory.name}</MenuItem>)
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <Button
                                variant="outlined"
                                component="label"
                                fullWidth
                            >
                                {files?.length ? "You want to upload " + files.length + " masks?" : "Choose your mask/s"}
                                <input
                                    onChange={handleFile}
                                    type="file"
                                    multiple="multiple"
                                    style={{display: "none"}}
                                />
                            </Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button
                                variant="outlined"
                                component="label"
                                color="primary"
                                fullWidth
                                onClick={uploadFile}
                            >
                                Upload mask
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>

        </Grid>
    )

}
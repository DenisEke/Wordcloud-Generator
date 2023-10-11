import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import React, {useContext, useState} from "react";
import {config as appConfig} from "../../../../../Constants";
import {post} from "axios";
import {MaskContext} from "../../../../../providers/MaskProvider";
import {UserContext} from "../../../../../providers/UserProvider";
import Link from "@material-ui/core/Link";
import {navigate} from "@reach/router";

export default function MaskUpload(props) {

    const maskContext = useContext(MaskContext);
    const user = useContext(UserContext);
    const [file, setFile] = useState();

    if (!user) {
        return (
            <Link onClick={() => navigate("/signin")}>
                Create an account and sign in to upload your own masks
            </Link>
        )
    }


    function handleFile(event) {
        setFile(event.target.files[0]);
    }

    async function uploadFile() {
        const url = appConfig.backendUrl + "masks";
        const formData = new FormData();
        formData.append('file', file);
        formData.append('user', user.uid);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        const res = await post(url, formData, config);
        maskContext.updateMasks();
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <Button
                    variant="outlined"
                    component="label"
                    fullWidth
                >
                    {file ? file.name : "Choose your mask"}
                    <input
                        onChange={handleFile}
                        type="file"
                        style={{display: "none"}}
                        accept="image/png, image/jpeg"
                    />
                </Button>
            </Grid>
            <Grid item xs={6}>
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
    )

}
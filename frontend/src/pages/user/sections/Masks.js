import React, {useContext} from "react";
import {MaskContext} from "../../../providers/MaskProvider";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {UserContext} from "../../../providers/UserProvider";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import {config} from "../../../Constants";
import axios from "axios"

export default function Masks() {

    const maskContext = useContext(MaskContext);
    const user = useContext(UserContext);
    let userCat = maskContext.masks.filter((cat) => cat.id === "masks_" + user.uid);

    async function deleteMask(maskId) {
        await axios.delete(config.backendUrl + "masks", {
            data: {
                mask: maskId, user: user.uid
            }
        });
        maskContext.updateMasks();
    }

    if (userCat.length === 0) {
        return <Typography>No Masks yet</Typography>;
    }

    userCat = userCat[0];

    if (userCat.masks.length <= 0) {
        return (
            <Typography>You don't have uploaded any masks yet :(</Typography>
        )
    }

    return (

        <Grid container spacing={3}>
            {userCat.masks.map((mask) =>
                <Grid item xs={2} key={mask.id}>
                    <Paper className={"padding"}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <img src={mask.path} alt={"Mask Preview"}
                                     className={"user-mask-preview"}/>
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" color="primary" fullWidth
                                        onClick={(event) => deleteMask(mask.id)}>
                                    Remove</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            )}
        </Grid>

    )
}
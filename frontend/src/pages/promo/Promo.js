import {UserContext} from "../../providers/UserProvider";
import React, {useContext} from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {navigate} from "@reach/router";
import axios from "axios";
import {config} from "../../Constants";

export default function (props) {

    const userContext = useContext(UserContext);

    if (!userContext) {
        return (<div>
            <Typography>Hey you need to sign in to redeem your promotion.</Typography>

            <Button onClick={() => navigate("signin")} variant={"contained"} color={"primary"}>Sign in</Button>
        </div>)

    }

    function getPromo() {
        axios.get(config.backendUrl + "user/promo/" + userContext.uid);
    }

    return (
        <Button onClick={getPromo} variant={"contained"} color={"primary"}>Get reward</Button>
    )

}
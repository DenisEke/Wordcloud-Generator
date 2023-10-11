import React, {useContext, useEffect, useState} from "react";
import {get, post} from "axios";
import {config as appConfig, config} from "../../../Constants";
import {UserContext} from "../../../providers/UserProvider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

import {loadStripe} from '@stripe/stripe-js';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(config.stripeKey);

export default function PacksPlan(props) {

    const [packs, setPacks] = useState([]);
    const [selectedPack, setSelectedPack] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getPacks() {
            const res = await get(config.backendUrl + "payments/packs");
            setPacks(res.data);
        }

        getPacks();
    }, []);

    const user = useContext(UserContext);

    async function purchasePack() {

        setLoading(true);

        const url = appConfig.backendUrl + "payments/pack";
        const data = {uid: user.uid, price: packs[selectedPack].price_id, mail: user.email};
        const res = await post(url, data);
        const sessionId = res.data;

        const stripe = await stripePromise;
        const {error} = await stripe.redirectToCheckout({
            sessionId,
        });

        if (error) {
            alert(error.message);
        }
        setLoading(false);

    }

    return (
        <div className="plan-best">
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Typography variant={"h6"}>
                        Premium Download Packs
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant={"subtitle2"}>
                        Choose one of our premium download packs:
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <List
                        component="nav"
                    >
                        {packs.length > 0 ?
                            packs.map((pack, index) =>
                                <div>
                                    <ListItem button selected={index === selectedPack}
                                              onClick={() => setSelectedPack(index)}>
                                        <ListItemText
                                            primary={pack.amount + " Premium Downloads - " + pack.price + "€"}/>
                                        {index === 1 ?
                                            <img className={"bestsellerIcon"} src={"/bestseller.png"}/> : null}
                                    </ListItem>
                                    {
                                        (index != packs.length - 1) ? <Divider/> : null
                                    }
                                </div>
                            ) : <CircularProgress/>
                        }
                    </List>
                </Grid>
                <Grid item xs={12}>
                    <Button fullWidth variant={"outlined"} color={"primary"} onClick={purchasePack}>{loading ?
                        <CircularProgress/> : "Buy now"}</Button>
                </Grid>
            </Grid>
        </div>
    )
}
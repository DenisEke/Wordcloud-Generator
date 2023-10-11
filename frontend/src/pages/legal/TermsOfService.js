import Typography from "@material-ui/core/Typography";
import React from "react";


export default function TermsOfService(props) {
    return (

        <div>
            {
                tos.map((el) => <div><Typography variant={el.variant}
                                                 align={el.align || "left"}>{el.content}</Typography><br/></div>)
            }
        </div>
    )
}

const tos = [
    {
        variant: "h2",
        content: "Terms of Service",
        align: "center"
    },
    {
        variant: "h6",
        content: "Not available yet :(",

    }
];

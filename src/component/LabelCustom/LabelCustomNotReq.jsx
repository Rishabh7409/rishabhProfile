import React from "react";
import { Label } from "reactstrap";

export default function LabelCustomNotReq({ required = false, children, ...props }) {
    return (
        <div {...props}>
            {children}
        </div>
    );
}




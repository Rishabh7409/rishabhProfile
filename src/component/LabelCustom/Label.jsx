import React from "react";
import { Label } from "reactstrap";

export default function LabelCus({ required = false, children, ...props }) {
    return (
        <Label {...props}>
            {children}
        </Label>
    );
}

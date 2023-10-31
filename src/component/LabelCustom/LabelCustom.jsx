import React from "react";
import { Label } from "reactstrap";

export default function LabelCustom({ required = false, children, ...props }) {
    return (
        <Label {...props}>
            {children}
            {required && <span className="text-danger">*</span>}
        </Label>
    );
}

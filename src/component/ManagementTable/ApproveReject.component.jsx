import React, { useCallback } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
// import { useSelector } from "react-redux";

import CustomTooltip from "../Common/CustomTooltip";

export default function ApproveReject({ showApproveButton, showRejectButton, rowContent, onClickApprove, onClickReject }) {
    const user = JSON.parse(localStorage.getItem("auth_user") || "{}");

    const onApprove = useCallback(() => onClickApprove?.(rowContent), [rowContent, onClickApprove]);
    const onReject = useCallback(() => onClickReject?.(rowContent), [rowContent, onClickReject]);

    return user.user?.id === rowContent.createdBy ? null : (
        <>
            {showApproveButton && (
                <CustomTooltip tooltipData="Approve">
                    <span className="icons text-success pointer" onClick={onApprove}>
                        <FaCheck size={18} />
                    </span>
                </CustomTooltip>
            )}
            {showRejectButton && (
                <CustomTooltip tooltipData="Reject">
                    <span className="icons text-danger pointer" onClick={onReject}>
                        <FaTimes size={18} />
                    </span>
                </CustomTooltip>
            )}
        </>
    );
}

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Card, CardBody, CardHeader, CardTitle, Input, Modal, ModalBody, ModalHeader, Row, Col, FormGroup, Button, Label, ModalFooter } from "reactstrap";
import DataTable from "react-data-table-component";
import toastr from "toastr";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import { IoMdCopy } from "react-icons/io";
import CustomTooltip from "../Common/CustomTooltip";
import { useForm, useToggle } from "../Common/useForm";
import MoreAction from "../Common/MoreAction";

const makeActionsColumn = ({
    primaryKey,
    pageLink,
    handleDelete,
    toggleAccountMaster,
    onClickView,
    onClickApprove,
    onClickReject,
    hideViewButton = false,
    hideEditButton = false,
    showschedulerButton,
    toogleschedulerbutton,
    hideDeleteButton = false,
    showApproveButton = false,
    showRejectButton = false,
    permissionViewButton = null,
    permissionEditButton = null,
    permissionDeleteButton = null,
    permissionAccountButton = null,
    permissionLoggedInButton = null,
    generateKeyIcon,
    mfiSettingIcon,
    ghpcIcon = null,
    criticalIllnessIcon = null,
    customButton = null,
    accountEntryApprove = null,
    customLinkState = null,
    pendingLink = null,
    gpaIcon = null,
    gtlIcon = null,
    ipcIcon = null,
    gclIcon = null,
    microIcon = null,
    copyToolTip = null,
    titletext = null,
    copyFunction,
    toggleFunction,
    updateExpireMailStatus,
}) => ({
    name: "Action",
    selector: "action",
    sortable: false,
    cell: (rowContent) => {
        const primaryValue = rowContent[primaryKey] || 1;
        const ghpc = rowContent.ghpcApplicable || null;
        const gpa = rowContent.gpaApplicable || null;
        const gtl = rowContent.gtlApplicable || null;
        const gcl = rowContent.gclApplicable || null;
        const ipc = rowContent.ipcApplicable || null;
        const micro = rowContent.microApplicable || null;
        const criticalIllness = rowContent.criticalIllnessApplicable || null;
        let accountMaster = rowContent.accountMaster || 0;
        let scheduleactive = rowContent.active || 0;
        const mailIcon = updateExpireMailStatus && rowContent.sendMailStatus === 1 ? "show" : "";
        const viewPageLink = typeof pageLink === "function" ? pageLink(rowContent, "view") : `${pageLink}/view/${primaryValue}`;
        const schedulePageLink = typeof pageLink === "function" ? pageLink(rowContent, "view") : `${pageLink}/${primaryValue}/schedule`;

        const viewIcon = (
            <CustomTooltip tooltipData="View">
                {onClickView ? (
                    <span onClick={() => onClickView(rowContent)} className="icons text-cyanBlue pointer">
                        <i className="ri-eye-line"></i>
                    </span>
                ) : (
                    <Link to={{ pathname: viewPageLink, state: { backButton: customLinkState } }} className="icons text-cyanBlue">
                        <i className="ri-eye-line"></i>
                    </Link>
                )}
            </CustomTooltip>
        );

        const editPageLink = typeof pageLink === "function" ? pageLink(rowContent, "edit") : `${pageLink}/edit/${primaryValue}`;

        const editIcon = (
            <CustomTooltip tooltipData="Edit">
                <Link to={editPageLink} className="icons text-cyanBlue">
                    <i className="ri-edit-line"></i>
                </Link>
            </CustomTooltip>
        );
        const schedulerIcon = (
            <CustomTooltip tooltipData="Schedule Job">
                {onClickView ? (
                    <span onClick={() => onClickView(rowContent)} className="icons text-cyanBlue pointer">
                        <i className="ri-time-line"></i>
                    </span>
                ) : (
                    <Link to={{ pathname: schedulePageLink, state: { backButton: customLinkState } }} className="icons text-cyanBlue">
                        <i className="ri-time-line"></i>
                    </Link>
                )}
            </CustomTooltip>
        );
        const togglebtn = (
            <>
                {
                    toogleschedulerbutton && scheduleactive == 0 ? (
                        <>
                            <CustomTooltip tooltipData={titletext}>
                                <span href="#" className="icons text-danger" onClick={(e) => toggleFunction(e, titletext, primaryValue, scheduleactive)}>
                                    <FaToggleOff size="20" />
                                </span>
                            </CustomTooltip>
                        </>
                    ) : (
                        <>
                            <CustomTooltip tooltipData={titletext}>
                                <span href="#" className="icons text-success" onClick={(e) => toggleFunction(e, titletext, primaryValue, scheduleactive)}>
                                    <FaToggleOn size="20" />
                                </span>
                            </CustomTooltip>
                        </>
                    )
                }
            </>
        )
        return (
            <div className="actionIconsGroup">
                {toogleschedulerbutton && togglebtn}
                {!hideViewButton && (viewPageLink || onClickView) && (permissionViewButton ? viewIcon : viewIcon)}
                {!hideEditButton && (permissionEditButton ? editIcon : editIcon)}
                {showschedulerButton && schedulerIcon}
                {!hideDeleteButton &&
                    (permissionDeleteButton ? (
                       
                                <CustomTooltip tooltipData="Delete">
                                    <span onClick={() => handleDelete(primaryValue)} className="icons text-danger pointer">
                                        <i className="ri-delete-bin-line"></i>
                                    </span>
                                </CustomTooltip>
                         
                    ) : (
                        <CustomTooltip tooltipData="Delete">
                            <span onClick={() => handleDelete(primaryValue)} className="icons text-danger pointer">
                                <i className="ri-delete-bin-line"></i>
                            </span>
                        </CustomTooltip>
                    ))}
                {!hideEditButton && mfiSettingIcon && permissionEditButton && (
                    <>
                        
                                <CustomTooltip tooltipData="Setting">
                                    <Link to={`${pageLink}/setting/${primaryValue}`} className="icons text-cyanBlue">
                                        <i className="ri-settings-2-fill"></i>
                                    </Link>
                                </CustomTooltip>
                       
                      
                                <CustomTooltip tooltipData="Approval Process Setting">
                                    <Link to={`${pageLink}/approval-setting/${primaryValue}`} className="icons text-cyanBlue">
                                        <i className="ri-settings-2-fill"></i>
                                    </Link>
                                </CustomTooltip>
                          
                      
                                <CustomTooltip tooltipData="Claim Step Setting">
                                    <Link to={`${pageLink}/${primaryValue}/claim-step-setting`} className="icons text-cyanBlue">
                                        <i className="ri-settings-2-fill"></i>
                                    </Link>
                                </CustomTooltip>
                       
        
                    </>
                )}

               
            </div>
        );
    },
});

const makeSnColumn = ({ primaryKey }) => ({
    name: "S.No.",
    selector: "sid",
    // sortable: true,
    // cell: (value, index) => <span>{index + 1}</span>,
});

const defaultInitialForm = Object.freeze({ id: null });
const defaultApis = Object.freeze({
    getAll: null,
    create: null,
    update: null,
    delete: null,
});

const defaultFields = [];

const ManagementTable = ({
    fields = defaultFields,
    // Don't provide rowsData, even empty array, if need to fetch ROWS from the API, USE it only for CUSTOM ROWS DATA FROM PARENT.
    rowsData,
    apis = defaultApis,
    initialForm = defaultInitialForm,
    title = "Title",
    tableTitle = "Table Title",
    pageLink = "/page",
    primaryKey = "id",
    highlightOnHover = true,
    pagination = true,
    hideSnColumn = false,
    hideHeader = false,
    hideSearch = false,
    hideActionsColumn = false,
    hideAddButton = false,
    hideDeleteButton = false,
    hideEditButton = false,
    hideViewButton = false,
    showApproveButton = false,
    showRejectButton = false,
    viewAsPopup = false,
    // Can provide extra buttons after the Add Button.
    childrenAfterAddButton,
    getAllFilter,
    permissionMaster,
    childrenBeforeTable,
    childrenUnderTable,
    childrenTableHeader,
    // permissions
    permissionAddButton = null,
    permissionViewButton = null,
    permissionEditButton = null,
    permissionDeleteButton = null,
    permissionAccountButton = null,
    permissionLoggedInButton = null,
    generateKeyIcon,
    onApproveReject,
    getAllDelete,
    mfiSettingIcon,
    searchText,
    keyField,
    getAllCounter = 0,
    downloadExcel,
    ghpcIcon = null,
    criticalIllnessIcon = null,
    customButton = null,
    accountEntryApprove = null,
    customLinkState = null,
    pendingLink = null,
    gpaIcon = null,
    gtlIcon = null,
    ipcIcon = null,
    gclIcon = null,
    microIcon = null,
    copyToolTip = null,
    titletext = null,
    updateExpireMailStatus,
    showschedulerButton = false,
    toogleschedulerbutton = false
}) => {
    const [initialRows, setInitialRows] = useState(null);
    const [rows, setRows] = useState(() => []);
    const [approvalMessage, setApprovalMessage] = useState("");
    const [form, onChange, setForm] = useForm(initialForm);
    const [loading, setLoading] = useState(true);

    const [showAddEdit, toggleShowAddEdit] = useToggle(false);
    const [showView, toggleShowView, setShowView] = useToggle(false);
    const [showApprove, toggleShowApprove] = useToggle(false);
    const [showReject, toggleShowReject] = useToggle(false);
    const [perMaster, setPerMaster] = useState("finhaat");

    const actionRow = useRef(null);
    const { navigate } = useNavigate();
    const handleView = useCallback(
        (rowData) => {
            setForm(rowData);
            setShowView(true);
        },
        [setForm, setShowView]
    );
    const searchPlaceholder = (columns) => {
        const newArrayColumn = Array.isArray(columns)
            ? columns.filter((obj) => {
                if (obj.name === "S.No." || obj.name === "Action" || obj.noSearchable) {
                    return false;
                } else return true;
            })
            : "";

        const placeholderName = `Search ${Array.isArray(newArrayColumn) ? newArrayColumn.map((f) => f.name) : ""}`;
        return placeholderName;
    };

    const getAll = useCallback(() => {
        if (!apis.getAll) return;
        let f = getAllFilter;
        if (permissionMaster) {
            f = `filter[type]=${perMaster}`;
        }
        (async () => {
            const response = await apis.getAll.api(f ? f : null);

            setInitialRows(
                response.data.map((d, i) => {
                    d.sid = i + 1;
                    return d;
                })
            );
        })();
    }, [apis.getAll, perMaster, getAllFilter]);

    const handleDelete = useCallback(
        (id) => {
            confirmAlert({
                title: `Delete ${title}`,
                message: "Do you want to proceed?",
                buttons: [
                    {
                        label: "Yes",
                        onClick: async () => {
                            if (!apis.delete) return;

                            const response = await apis.delete.api(id);
                            if (!response?.status) return toastr.error(response?.message || `Could not delete ${title}`);

                            toastr.success(response?.message || `Deleted the ${title} successfully.`);

                            getAllDelete ? getAll() : setInitialRows((prev) => prev?.filter((row) => row[primaryKey] !== id) || []);
                        },
                    },
                    {
                        label: "No",
                        onClick: () => { },
                    },
                ],
            });
        },
        [title, apis.delete, getAllDelete, getAll, primaryKey]
    );


    const toggleAccountMaster = useCallback(
        async (id) => {
            if (!apis.toggleAccount) return;

            const response = await apis.toggleAccount.api(id);
            if (!response?.status) return toastr.error(response?.message || `Could Not Updated`);
            toastr.success(response?.message || `Updated Successfully.`);

            getAll();
        },
        [getAll, primaryKey]
    );

    const handleSubmit = () => {
        setInitialRows((prev) => (form[primaryKey] ? prev || [] : [...(prev || []), { ...form, [primaryKey]: (prev || []).length + 1 }]));
        toggleShowAddEdit();
    };

    const handleCloseApprove = () => {
        actionRow.current = null;
        toggleShowApprove();
    };
    const handleCloseReject = () => {
        actionRow.current = null;
        setApprovalMessage("");
        toggleShowReject();
    };

    const handleApprove = useCallback(
        (rowData) => {
            toggleShowApprove();
            actionRow.current = rowData;
        },
        [toggleShowApprove]
    );

    const handleReject = useCallback(
        (rowData) => {
            toggleShowReject();
            actionRow.current = rowData;
        },
        [toggleShowReject]
    );

    const onApprove = () => {
        if (onApproveReject)
            onApproveReject(
                {
                    id: actionRow.current ? actionRow.current[primaryKey] : null,
                    message: approvalMessage,
                    data: actionRow.current,
                },
                "Approve"
            );
        handleCloseApprove();
    };
    const onReject = () => {
        if (onApproveReject)
            onApproveReject(
                {
                    id: actionRow.current ? actionRow.current[primaryKey] : null,
                    message: approvalMessage,
                    data: actionRow.current,
                },
                "Reject"
            );
        handleCloseReject();
    };

    const copyFunction = useCallback(
        (e, copyToolTip, link) => {
            e.preventDefault();
            confirmAlert({
                title: copyToolTip,
                message: "Do you want to proceed?",
                buttons: [
                    {
                        label: "Yes",
                        onClick: async () => {
                            navigate(link);
                        },
                    },
                    {
                        label: "No",
                        onClick: () => { },
                    },
                ],
            });
        },
        [navigate]
    );

    const toggleFunction = useCallback(
        (e, titletext, id, isactive) => {
            e.preventDefault();
            confirmAlert({
                title: isactive == 0 ? `Active ${titletext}` : `Inactive ${titletext}`,
                message: "Do you want to proceed?",

                buttons: [
                    {
                        label: "Yes",
                        onClick: async () => {
                            if (!apis.update) return;
                            const changeActive = isactive == 0 ? '1' : '0';
                            const response = await apis.update.api({ "id": id, "active": changeActive });
                            if (!response?.status) return toastr.error(response?.message || `Could not Update ${title}`);

                            toastr.success(response?.message || `Update the ${title} successfully.`);

                            getAll();
                        },
                    },
                    {
                        label: "No",
                        onClick: () => { },
                    },
                ],
            });
        },
        [getAll]
    );

    const columns = useMemo(() => {
        const onlyColumns = fields.filter((field) => !field.hideTableColumn);
        const cols = !hideSnColumn ? [makeSnColumn(primaryKey), ...onlyColumns] : [...onlyColumns];

        if (!hideActionsColumn)
            cols.push(
                makeActionsColumn({
                    pageLink,
                    primaryKey,
                    onClickView: viewAsPopup ? handleView : null,
                    handleDelete,
                    toggleAccountMaster,
                    hideDeleteButton,
                    hideViewButton,
                    hideEditButton,
                    showApproveButton,
                    showRejectButton,
                    permissionViewButton,
                    permissionEditButton,
                    permissionDeleteButton,
                    permissionAccountButton,
                    permissionLoggedInButton,
                    generateKeyIcon,
                    onClickApprove: handleApprove,
                    onClickReject: handleReject,
                    mfiSettingIcon,
                    ghpcIcon,
                    criticalIllnessIcon,
                    customButton,
                    accountEntryApprove,
                    customLinkState,
                    pendingLink,
                    gpaIcon,
                    gtlIcon,
                    ipcIcon,
                    gclIcon,
                    microIcon,
                    copyToolTip,
                    titletext,
                    copyFunction,
                    toggleFunction,
                    updateExpireMailStatus,
                    showschedulerButton,
                    toogleschedulerbutton
                })
            );

        return cols;
    }, [
        fields,
        hideSnColumn,
        primaryKey,
        hideActionsColumn,
        pageLink,
        viewAsPopup,
        handleView,
        handleDelete,
        toggleAccountMaster,
        hideDeleteButton,
        hideViewButton,
        hideEditButton,
        showApproveButton,
        showRejectButton,
        permissionViewButton,
        permissionEditButton,
        permissionDeleteButton,
        permissionAccountButton,
        permissionLoggedInButton,
        generateKeyIcon,
        handleApprove,
        handleReject,
        mfiSettingIcon,
        ghpcIcon,
        criticalIllnessIcon,
        customButton,
        accountEntryApprove,
        customLinkState,
        pendingLink,
        gpaIcon,
        gtlIcon,
        ipcIcon,
        gclIcon,
        microIcon,
        copyToolTip,
        titletext,
        copyFunction,
        toggleFunction,
        updateExpireMailStatus,
    ]);

    useEffect(() => {
        setRows(
            Array.isArray(initialRows)
                    ? [...initialRows]
                    : []
               
        );
    }, [ initialRows, fields]);

    useEffect(() => {
        if (!Array.isArray(rowsData)) return;

        setInitialRows(
            rowsData.map((d, i) => {
                d.sid = i + 1;
                return d;
            })
        );
    }, [rowsData]);

    useEffect(() => {
        if (!apis.getAll || rowsData) return;
        let f = getAllFilter;
        if (permissionMaster) {
            f = `filter[type]=${perMaster}`;
        }
        (async () => {
            const response = await apis.getAll.api(f ? f : null);
            console.log('====================================');
            console.log(response.data?.data);
            console.log('====================================');
            if (response.data)
                setInitialRows(
                    response?.data?.data?.map((d, i) => {
                        d.sid = i + 1;
                        return d;
                    })
                );
            else setInitialRows([]);
        })();
    }, [apis.getAll, getAllFilter, perMaster, rowsData]);

    useEffect(() => {
        if (Array.isArray(initialRows)) {
            setLoading(false);
        }
    }, [initialRows]);

  
  


    useEffect(() => {
        if (getAllCounter) {
            getAll();
        }
    }, [getAll, getAllCounter]);



    return (
        <>
            <Card className="iq-card">
                {childrenTableHeader && childrenTableHeader()}
                {!hideHeader && (
                    <CardHeader className="iq-card-header d-flex justify-content-between">
                        <CardTitle className="iq-header-title">
                            <h4 className="card-title">{tableTitle}</h4>
                            {pendingLink && (
                                <Link to={`${pendingLink}`} className="btn-icon">
                                    <button className="btn btn-primary">Pending Entry</button>
                                </Link>
                            )}
                            {permissionMaster && (
                                <button
                                    className="btn btn-primary"
                                    onClick={(e) => {
                                        if (perMaster == "finhaat") {
                                            setPerMaster("mfi");
                                        } else {
                                            setPerMaster("finhaat");
                                        }
                                    }}
                                >
                                    {perMaster}
                                </button>
                            )}
                            <div className="tblRightAction companiesTbl">
                            
                                <div className="moreActions">
                                    <MoreAction>
                                        <div className="btn-toolbar">
                                            {
                                                (
                                                  
                                                            <CustomTooltip tooltipData={`Add ${title}`}>
                                                                
                                                                    <Link to={`${pageLink}/add`} className="btn-icon">
                                                                        <i className="ri-add-circle-line"></i>
                                                                    </Link>
                                                                
                                                            </CustomTooltip>
                                                    
                                                )}
                                         
                                        </div>
                                    </MoreAction>
                                </div>
                            </div>
                        </CardTitle>
                    </CardHeader>
                )}
                {childrenUnderTable}
                <CardBody className="iq-card-body p-0 claimTbl">
                    {childrenBeforeTable && childrenBeforeTable()}

                    <DataTable
                        noDataComponent={<div style={{ padding: "24px" }}>{loading ? "Loading" : "There are no records to display"}</div>}
                        columns={columns}
                        data={rows}
                        highlightOnHover={highlightOnHover}
                        keyField={keyField || "id"}
                        hideActionsColumn
                    />

                </CardBody>
            </Card>
            <Modal toggle={toggleShowAddEdit} isOpen={showAddEdit}>
                <ModalHeader toggle={toggleShowAddEdit}>{`${form[primaryKey] ? "Edit" : "Add"} ${title}`}</ModalHeader>
                <ModalBody>
                    <Card className={"iq-card"}>
                        <CardBody className={"iq-card-body"}>
                            <Row>
                                {fields.map(({ name, selector, selectorForm = selector }, index) => (
                                    <Col sm="12" key={index}>
                                        <FormGroup>
                                            <Label>Enter {name}</Label>
                                            <Input type="text" name={selectorForm} value={form[selectorForm]} onChange={onChange} placeholder={name} />
                                        </FormGroup>
                                    </Col>
                                ))}
                            </Row>
                        </CardBody>
                    </Card>
                </ModalBody>
                <ModalFooter>
                    <div className="text-center pb-2 pt-2">
                        <Button onClick={toggleShowAddEdit} type="button" color={"light"} className="customBtn mr-md-4 mr-1">
                            Back
                        </Button>
                        <Button onClick={handleSubmit} type="button" color={"primary"} className="customBtn">
                            Save
                        </Button>
                    </div>
                </ModalFooter>
            </Modal>
            <Modal toggle={toggleShowView} isOpen={showView}>
                <ModalHeader toggle={toggleShowView}>{`View ${title}`}</ModalHeader>
                <ModalBody>
                    <CardBody className={"viewData"}>
                        <Row>
                            {fields.map((field, index) => (
                                <Col lg={12} key={index}>
                                    <FormGroup>
                                        <Label>{field.name}</Label>
                                        <strong>{form[field.selector]}</strong>
                                    </FormGroup>
                                </Col>
                            ))}
                        </Row>
                    </CardBody>
                </ModalBody>
                <ModalFooter>
                    <div className="text-center pb-2 pt-2">
                        <Button onClick={toggleShowView} type="button" color={"light"} className="customBtn mr-md-4 mr-1">
                            Close
                        </Button>
                    </div>
                </ModalFooter>
            </Modal>

            <Modal toggle={handleCloseApprove} isOpen={showApprove} size="md" centered>
                <ModalHeader toggle={handleCloseApprove}>{`Approve`}</ModalHeader>
                <ModalBody>
                    <div className="p-2 m-2">
                        <h4>Are you sure to approve this record ?</h4>
                        {accountEntryApprove && (
                            <div className="form-group my-2">
                                <textarea
                                    className="form-control"
                                    type="text"
                                    value={approvalMessage}
                                    onChange={(event) => setApprovalMessage(event.target.value)}
                                    placeholder="Reason for approving the record (or any message)."
                                />
                            </div>
                        )}
                    </div>

                    <div className="px-2 mx-2 d-flex justify-content-end">
                        <button className="btn btn-secondary m-2" onClick={handleCloseApprove}>
                            No
                        </button>
                        <button className="btn btn-success m-2" onClick={onApprove}>
                            Yes
                        </button>
                    </div>
                </ModalBody>
            </Modal>

            <Modal toggle={handleCloseReject} isOpen={showReject} size="md" centered>
                <ModalHeader toggle={handleCloseReject}>{`Reject`}</ModalHeader>
                <ModalBody>
                    <div className="p-2 m-2">
                        <h4>Are you sure to reject this record ?</h4>
                        <div className="form-group my-2">
                            <textarea
                                className="form-control"
                                type="text"
                                value={approvalMessage}
                                onChange={(event) => setApprovalMessage(event.target.value)}
                                placeholder="Reason for rejecting the record (or any message)."
                            />
                        </div>
                    </div>
                    <div className="px-2 mx-2 d-flex justify-content-end">
                        <button className="btn btn-success m-2" onClick={handleCloseReject}>
                            No
                        </button>
                        <button className="btn btn-danger m-2" onClick={onReject}>
                            Yes
                        </button>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
};

export default React.memo(ManagementTable);

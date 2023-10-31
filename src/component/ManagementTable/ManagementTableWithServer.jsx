import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { Link, useHistory } from "react-router-dom";
import { Card, CardBody, CardHeader, CardTitle, Input, Modal, ModalBody, ModalHeader, Row, Col, FormGroup, Button, Label, ModalFooter } from "reactstrap";
import DataTable from "react-data-table-component";
import toastr from "toastr";

import { useToggle, useForm, useDebounce } from "../../_helpers/hooks";
import { SetPermission } from "../SetPermission/Permissions";
import CustomTooltip from "../Common/CustomTooltip";
import ApproveReject from "./ApproveReject.component";
import { getQueryParam } from "../../_helpers/commonHelper";
import { BiSearchAlt } from "react-icons/bi";
import CustomSearch from "../Common/CustomSearch";
import MoreAction from "../Common/MoreAction";

const makeActionsColumn = ({
    primaryKey,
    pageLink,
    handleDelete,
    onClickView,
    onClickApprove,
    onClickReject,
    hideViewButton = false,
    hideEditButton = false,
    hideDeleteButton = false,
    showApproveButton = false,
    showRejectButton = false,
    permissionViewButton = null,
    permissionEditButton = null,
    permissionDeleteButton = null,
    permissionLoggedInButton = null,
    mfiSettingIcon,
}) => ({
    name: "Action",
    selector: "action",
    sortable: false,
    cell: (rowContent) => {
        const primaryValue = rowContent[primaryKey] || 1;

        const viewPageLink = typeof pageLink === "function" ? pageLink(rowContent) : `${pageLink}/view/${primaryValue}`;

        const viewIcon = (
            <CustomTooltip tooltipData="View">
                {onClickView ? (
                    <span onClick={() => onClickView(rowContent)} className="icons text-cyanBlue pointer">
                        <i className="ri-eye-line"></i>
                    </span>
                ) : (
                    <Link to={viewPageLink} className="icons text-cyanBlue">
                        <i className="ri-eye-line"></i>
                    </Link>
                )}
            </CustomTooltip>
        );

        return (
            <div className="actionIconsGroup">
                {!hideViewButton && (viewPageLink || onClickView) && (permissionViewButton ? <SetPermission permission={permissionViewButton} data={viewIcon} /> : viewIcon)}
                {!hideEditButton &&
                    (permissionEditButton ? (
                        <SetPermission
                            permission={permissionEditButton}
                            data={
                                <CustomTooltip tooltipData="Edit">
                                    <Link to={`${pageLink}/edit/${primaryValue}`} className="icons text-cyanBlue">
                                        <i className="ri-edit-line"></i>
                                    </Link>
                                </CustomTooltip>
                            }
                        />
                    ) : (
                        <CustomTooltip tooltipData="Edit">
                            <Link to={`${pageLink}/edit/${primaryValue}`} className="icons text-cyanBlue">
                                <i className="ri-edit-line"></i>
                            </Link>
                        </CustomTooltip>
                    ))}
                {!hideEditButton && mfiSettingIcon && permissionEditButton && (
                    <SetPermission
                        permission={permissionEditButton}
                        data={
                            <CustomTooltip tooltipData="Setting">
                                <Link to={`${pageLink}/setting/${primaryValue}`} className="icons text-cyanBlue">
                                    <i className="ri-settings-2-fill"></i>
                                </Link>
                            </CustomTooltip>
                        }
                    />
                )}
                {!hideDeleteButton &&
                    (permissionDeleteButton ? (
                        <SetPermission
                            permission={permissionDeleteButton}
                            data={
                                <CustomTooltip tooltipData="Delete">
                                    <span onClick={() => handleDelete(primaryValue)} className="icons text-danger pointer">
                                        <i className="ri-delete-bin-line"></i>
                                    </span>
                                </CustomTooltip>
                            }
                        />
                    ) : (
                        <CustomTooltip tooltipData="Delete">
                            <span onClick={() => handleDelete(primaryValue)} className="icons text-danger pointer">
                                <i className="ri-delete-bin-line"></i>
                            </span>
                        </CustomTooltip>
                    ))}

                {permissionLoggedInButton && (
                    <SetPermission
                        permission={permissionLoggedInButton}
                        data={
                            <CustomTooltip tooltipData="Login MFI">
                                <Link to={"company/" + rowContent.id + "/dashboard"} className="icons text-cyanBlue">
                                    <i className="ri-admin-line"></i>
                                </Link>
                            </CustomTooltip>
                        }
                    />
                )}

                <ApproveReject
                    showApproveButton={showApproveButton}
                    showRejectButton={showRejectButton}
                    rowContent={rowContent}
                    onClickApprove={onClickApprove}
                    onClickReject={onClickReject}
                />
            </div>
        );
    },
});

const makeSnColumn = ({ primaryKey }) => ({
    name: "S.No.",
    selector: "sid",
    // sortable: true,
    sortField: "id",

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

const paginationPerPageArray = [10, 15, 20, 25, 30];

const ManagementTableWithServer = ({
    fields = defaultFields,
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
    childrenBeforeTable,
    childrenUnderTable,
    // permissions
    permissionAddButton = null,
    permissionViewButton = null,
    permissionEditButton = null,
    permissionDeleteButton = null,
    permissionLoggedInButton = null,
    uploadPermission = null,
    onApproveReject,
    getAllDelete,
    mfiSettingIcon,
    searchText,
    keyField,
    getAllCounter,
    cssClass,
    coIPage,
    downloadExcel,
    searchPosition
}) => {
    const [rows, setRows] = useState(() => []);
    const [search, setSearch] = useState(() => getQueryParam("q") || "");
    const [approvalMessage, setApprovalMessage] = useState("");
    const [form, onChange, setForm] = useForm(initialForm);

    const [showAddEdit, toggleShowAddEdit] = useToggle(false);
    const [showView, toggleShowView, setShowView] = useToggle(false);
    const [showApprove, toggleShowApprove] = useToggle(false);
    const [showReject, toggleShowReject] = useToggle(false);

    // new
    const [loading, setLoading] = useState(true);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(() => (paginationPerPageArray.includes(+getQueryParam("limit")) ? +getQueryParam("limit") : 10));
    const [page, setPage] = useState(() => +(getQueryParam("page") || 1));
    const [sortColumn, setSortColumn] = useState(() => getQueryParam("sortBy") || "");
    const [sortDirection, setSortDirection] = useState(() => getQueryParam("orderBy") || "");
    const { push, location } = useHistory();
    const [filter, setFilter] = useState(null);

    const actionRow = useRef(null);

    const defaultFilter = useMemo(() => (getAllFilter ? getAllFilter : null), [getAllFilter]);
    const tab = useMemo(() => getQueryParam("tab"), []);

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

    const getAll = useDebounce(() => {
        if (!apis.getAll) return;
        // console.log('---------------------------------------start');
        // console.log(filter, page);
        // console.log('---------------------------------------end');
        (async () => {
            let filterObj = defaultFilter ? (filter ? `${defaultFilter}&${filter}` : filter) : defaultFilter;

            const response = await apis.getAll.api(filterObj);
            setRows(
                response.data.map((d, i) => {
                    d.sid = (page - 1) * perPage + i + 1;
                    return d;
                })
            );
            setTotalRows(response.totalCount);
            setLoading(false);
        })();
    }, [apis.getAll, defaultFilter, filter, perPage]); // [apis.getAll, defaultFilter, filter, page, perPage]

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

                            getAllDelete ? getAll() : setRows((prev) => prev.filter((row) => row[primaryKey] !== id));
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

    const handleSubmit = () => {
        setRows((prev) => (form[primaryKey] ? prev : [...prev, { ...form, [primaryKey]: prev.length + 1 }]));
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
                    hideDeleteButton,
                    hideViewButton,
                    hideEditButton,
                    showApproveButton,
                    showRejectButton,
                    permissionViewButton,
                    permissionEditButton,
                    permissionDeleteButton,
                    permissionLoggedInButton,
                    onClickApprove: handleApprove,
                    onClickReject: handleReject,
                    mfiSettingIcon,
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
        hideDeleteButton,
        hideViewButton,
        hideEditButton,
        showApproveButton,
        showRejectButton,
        permissionViewButton,
        permissionEditButton,
        permissionDeleteButton,
        permissionLoggedInButton,
        handleApprove,
        handleReject,
        mfiSettingIcon,
    ]);

    /************ Server side pagination , sorting and searching*************/

    const handlePageChange = useCallback((newPage) => {
        setPage(newPage);
        // getAll();
    }, []);

    const handlePerRowsChange = useCallback((newPerPage, page) => {
        setPerPage(newPerPage);
    }, []);

    const handleSort = useCallback((column, sortDirection) => {
        setSortColumn(column.sortField || column.selector);
        setSortDirection(sortDirection);
    }, []);

    // Query param handle

    // useEffect(() => {
    //     let text =
    //         `page=${page}&limit=${perPage}` + (search ? `&q=${search}` : "") + (sortColumn ? `&sortBy=${sortColumn}` : "") + (sortDirection ? `&orderBy=${sortDirection}` : "");

    //     push({
    //         path: location.pathname,
    //         search: "?" + text,
    //     });
    //     setFilter(text);
    // }, [location.pathname, page, perPage, push, search, sortColumn, sortDirection]);

    useEffect(() => {
        let timer = setTimeout(() => {
            let text =
                `page=${page}&limit=${perPage}` + (search ? `&q=${search}` : "") + (sortColumn ? `&sortBy=${sortColumn}` : "") + (sortDirection ? `&orderBy=${sortDirection}` : "");

            push({
                path: location.pathname,
                search: "?" + text,
            });
            setFilter(text);
        }, 1000);

        return () => clearTimeout(timer);
    }, [location.pathname, page, perPage, push, search, sortColumn, sortDirection]);

    // useEffect(() => {
    //     console.log("/**** Location Search **/");
    //     console.log("location.search", location.search);

    //     const query = new URLSearchParams(location.search);
    //     let searchText = decodeURIComponent(query.get("q")) === "null" ? null : decodeURIComponent(query.get("q"));

    //     console.log("searchText", searchText);

    //     console.log("update search");
    //     // setSearch(searchText || "");
    // }, [location.search]);

    useEffect(() => {
        const q = getQueryParam("q");
        setSearch(q || "");
        const perPage = getQueryParam("limit");
        setPerPage(paginationPerPageArray.includes(+perPage) ? +perPage : 10);
        const page = getQueryParam("page");
        setPage(+(page || 1));
        const sortBy = getQueryParam("sortBy");
        setSortColumn(sortBy || "");
        const orderBy = getQueryParam("orderBy");
        setSortDirection(orderBy || "");
    }, [location.search]);

    useEffect(() => {
        if (!filter) return;
        setLoading(true);
        getAll(filter);
    }, [filter, getAll]);

    const onChangeSearch = ({ target: { value } }) => {
        if (page !== 1 && value) setPage(1);
        setSearch(value);
    };

    useEffect(() => {
        if (getAllCounter) {
            getAll();
        }
    }, [getAll, getAllCounter]);

    const downloadExcelFn = useCallback(() => {
        confirmAlert({
            title: "Export Excel",
            message: "Do you want to proceed?",
            buttons: [
                {
                    label: "Yes",
                    onClick: async () => {
                        let response = await downloadExcel();
                        if (response && response.status) {
                            toastr.success(response?.message || `Successfully Sent to email.`);
                        } else {
                            toastr.error(response?.message || `Something went wrong, please try again.`);
                        }
                    },
                },
                {
                    label: "No",
                    onClick: () => { },
                },
            ],
        });
    }, [downloadExcel]);

    return (
        <>
            <Card className={`iq-card ${cssClass ? cssClass : ""}`}>
                {coIPage && childrenUnderTable && childrenUnderTable()}
                {!hideHeader && (
                    <CardHeader className="iq-card-header d-flex justify-content-between">
                        <CardTitle className="iq-header-title">
                            <h4 className="card-title">{tableTitle}</h4>
                            <div className="tblRightAction companiesTbl">
                                {(!hideSearch && !searchPosition) && (
                                    <div className="actionsection">
                                        <CustomSearch>
                                            <div className="tblSearch">
                                                <Input type="text" name="search" value={search} onChange={onChangeSearch} placeholder={searchPlaceholder(columns)} />
                                            </div>
                                        </CustomSearch>
                                    </div>
                                )}
                                <div className="moreActions">
                                    <MoreAction>
                                        <div className="btn-toolbar">
                                            {!hideAddButton &&
                                                (permissionAddButton ? (
                                                    <SetPermission
                                                        permission={permissionAddButton}
                                                        data={
                                                            <CustomTooltip tooltipData={`Add ${title}`}>
                                                                {apis.create ? (
                                                                    <span onClick={toggleShowAddEdit} className="btn-icon pointer">
                                                                        <i className="ri-add-circle-line"></i>
                                                                    </span>
                                                                ) : (
                                                                    <Link to={`${pageLink}/add`} className="btn-icon">
                                                                        <i className="ri-add-circle-line"></i>
                                                                    </Link>
                                                                )}
                                                            </CustomTooltip>
                                                        }
                                                    />
                                                ) : (
                                                    <CustomTooltip tooltipData={`Add ${title}`}>
                                                        {apis.create ? (
                                                            <span onClick={toggleShowAddEdit} className="btn-icon pointer">
                                                                <i className="ri-add-circle-line"></i>
                                                            </span>
                                                        ) : (
                                                            <Link to={`${pageLink}/add`} className="btn-icon">
                                                                <i className="ri-add-circle-line"></i>
                                                            </Link>
                                                        )}
                                                    </CustomTooltip>
                                                ))}
                                            {childrenAfterAddButton && childrenAfterAddButton()}
                                            {downloadExcel && (
                                                <CustomTooltip tooltipData={`Download`}>
                                                    <span onClick={downloadExcelFn} className="btn-icon pointer">
                                                        <i className="fa fa-download"></i>
                                                    </span>
                                                </CustomTooltip>
                                            )}
                                        </div>
                                    </MoreAction>
                                </div>
                            </div>
                        </CardTitle>
                    </CardHeader>
                )}

                <CardBody className="iq-card-body p-0">
                    {childrenBeforeTable && childrenBeforeTable()}
                    {!coIPage && childrenUnderTable && childrenUnderTable()}
                    {(!hideSearch && searchPosition) && (
                        <CardHeader className="iq-card-header d-flex justify-content-between">
                            <CardTitle className="iq-header-title">
                                <div></div>
                                <div className="tblRightAction companiesTbl">
                                    {!hideSearch && (
                                        <div className="actionsection">
                                            <CustomSearch>
                                                <div className="tblSearch tblSearchP2">
                                                    <Input type="text" name="search" value={search} onChange={onChangeSearch} placeholder={searchPlaceholder(columns)} />
                                                </div>
                                            </CustomSearch>
                                        </div>
                                    )}

                                </div>
                            </CardTitle>
                        </CardHeader>
                    )}
                    <DataTable
                        noDataComponent={<div style={{ padding: "24px" }}>{loading ? "Loading" : "There are no records to display"}</div>}
                        columns={columns}
                        data={rows}
                        highlightOnHover={highlightOnHover}
                        pagination={pagination}
                        keyField={keyField || "id"}
                        paginationServer={true}
                        paginationTotalRows={totalRows}
                        onChangeRowsPerPage={handlePerRowsChange}
                        onChangePage={handlePageChange}
                        paginationPerPage={perPage}
                        sortServer={true}
                        onSort={handleSort}
                        progressPending={loading}
                        persistTableHead
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
export default ManagementTableWithServer;

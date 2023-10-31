import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Col, Row } from "reactstrap";
import toastr from "toastr";
import { useNavigate } from "react-router";
import { bookApis, bookPageLink, bookPrimaryKey } from "./DATA";
import { confirmAlert } from "react-confirm-alert";
import { deleteBookById, getAllBook } from "../../_helper/CallApi/bookService";
import { Link } from "react-router-dom";
import ManagementTable from "../ManagementTable/ManagementTable";
import DataTable from "react-data-table-component";
import { setSession } from "../../_helper/ApiConfig/API_AUTH";

const BookList = () => {
    const [tableData, setTableData] = useState([]);
const navigate=useNavigate()
    const BookFields = useMemo(
        () => [
            { name: "S.No.", selector: "sid",
            colLg: 2, sortable: true,
            width: "80px"  },
            { name: "Title", selector: "title",
            colLg: 3, sortable: true },
            { name: "Author", selector: "author",colLg: 3, sortable: true },
            {
                name: "Action",
                sortable: false,colLg: 5,
                cell: (rowContent, row) => {
                    return (
                        <div className="m-1">
                               <Link to={"/book/view/" + rowContent.id} className="icons m-1 text-cyanBlue">
                                <i className="ri-eye-line"></i>view
                            </Link>
                            <Link to={"/book/edit/" + rowContent.id} className="icons m-1 text-cyanBlue">
                                <i className="ri-edit-line"></i>edit
                            </Link>
                            <span className="icons m-1 text-danger pointer" style={{cursor:"pointer"}} onClick={(e) => {e.preventDefault()
                                deleteRow(e, rowContent.id)}}>
                                <i className="ri-delete-bin-line"></i>delete
                            </span>

                        </div>
                    );
                },
            },
        ],
        []
    );

    const getAllBooks = useCallback(async () => {
        let response = await getAllBook();
        if (response && response.status) {
            console.log('====================================');
            console.log(response);
            console.log('====================================');
            let data = response?.data?.data;

            data = data?.map((e, i) => {
                e.sid = i + 1;
                return e;
            });

            setTableData(data);
        } else {
            setTableData([]);
        }
    }, []);

    useEffect(() => {
        getAllBooks();
    }, [getAllBooks]);

    const deleteRow = useCallback(
        (e, id) => {
            e.preventDefault();

            confirmAlert({
                title: "Delete Row",
                message: "Do you want to proceed?",
                buttons: [
                    {
                        label: "Yes",
                        onClick: async () => {
                            let response = await deleteBookById(id);

                            if (response && response.status) {
                                toastr.info(response.message || "Deleted successfully!");
                                getAllBooks();
                            } else if (response && response.message) {
                                toastr.info(response.message);
                            }
                        },
                    },
                    {
                        label: "No",
                        onClick: () => {},
                    },
                ],
            });
        },
        [getAllBooks]
    );

 

    return (
        <Row sm={12}>
            
            <Row  className="d-flex justify-content-between m-2" style={{fontSize:"25px",padding:"2%"}}>Book List</Row><div  style={{marginLeft:'70%'}}> <Button className="mt-5 mr-2" onClick={(e)=>{e.preventDefault()
            navigate('/book/add')}}>Add Book</Button><span><Button  className="mt-5 justify-content-end" onClick={(e)=>{e.preventDefault()
                setSession()
                navigate('/login')}}>Log Out</Button></span></div>
            <Col sm="12">
                {/* <ManagementTable
                    rowsData={tableData}
                    fields={BookFields}
                    apis={bookApis}
                    title="Books"
                    tableTitle="Book List"
                    pageLink={bookPageLink()} primaryKey={bookPrimaryKey}
                    hideAddButton
                /> */}
                   <DataTable
                        noDataComponent={<div style={{ padding: "24px" }}>{ "There are no records to display"}</div>}
                        columns={BookFields}
                        data={tableData}
                        highlightOnHover={true}
                        keyField={"id"}
                        showGridlines
                        title="Book"
                        tableStyle={{ width:"200px" }}
                    />

                  </Col>
        </Row>
    );
};

export default BookList;

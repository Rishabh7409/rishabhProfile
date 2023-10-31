import React, { useEffect, useState } from "react";
import { Row, Col, Card, CardHeader, CardTitle, CardBody, Form, FormGroup, Input, Button } from "reactstrap";
import { bookInitialForm } from "./DATA";
import toastr from "toastr";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "../Common/useForm";
import { addBook, getBookById, updateBookById } from "../../_helper/CallApi/bookService";
import LabelCustom from "../LabelCustom/LabelCustom";

const BookEdit = () => {
    const { id } = useParams();
    const  navigate  = useNavigate();
    const [form, onChange, setForm] = useForm(bookInitialForm);
    const [error, setError] = useState(bookInitialForm);
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        console.log('====================================');
        console.log(form);
        console.log('====================================');
    },[form])
    useEffect(() => {
        if (id) {
            (async () => {
                const response = await getBookById(id);
                console.log('====================================');
                console.log(response.data,response.data.title);
                console.log('====================================');
                if (response.status && response.data) {
                    setForm({
                        title: response.data.data.title,
                        author: response.data.data.author,
                        summary: response.data.data.summary,
                    });
                }
            })();
        }
    }, [id]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        const errorObj = [];
        for (let key in form) {
            if (!form[key]) {
                errorObj.push(key);
            }
        }
        if(errorObj.length>0){

            console.log('====================================');
            console.log(form,errorObj);
            console.log('====================================');
        for (let key in errorObj){

            toastr.error(`${errorObj[key]} is requered`)
        }
    return}
        setError(errorObj);
        if (Object.keys(errorObj).length) return;
        setIsLoading(true);
        const formData = { ...form };
        const data = await (id ? updateBookById(id, formData) : addBook(formData));
        if (data) {
            console.log('====================================');
            console.log(data);
            console.log('====================================');
           
            if (data.data.status==1) {
                toastr.success(data.data.message || "Success");
                navigate(`/books`);
            } else if (data ) {
                toastr.error(data.data.message);
            }
        }
        setIsLoading(false);
    };

    return (
        <>
            <Row className="justify-content-center">

            <div className="w-50 rounded  bg-light p-3">
                <Col  >
                    <Card className={"iq-card"}>
                        <CardHeader className={"iq-header-title d-flex justify-content-between"}>
                            <CardTitle className={"card-title"}>
                                <h4>{id?"Edit":"Add"} Book</h4>
                            </CardTitle>
                           
                        </CardHeader>
                        <CardBody className={"iq-card-body"}>
                            <Form  >
                                <Row sm={12}>
                                    <Col md={4}>
                                        <FormGroup>
                                            <LabelCustom required>Title</LabelCustom>
                                            <Input type="text" name="title" value={form.title} onChange={onChange} className={"form-control"} />
                                            {/* <InputError submitted={submitted} error={error} name="loanAccountNumber" /> */}
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup>
                                            <LabelCustom required>Author</LabelCustom>
                                            <Input type="text" name="author" value={form.author} onChange={onChange} className={"form-control"} />
                                            {/* <InputError submitted={submitted} error={error} name="coiNumber" /> */}
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <LabelCustom required>Summary</LabelCustom>
                                            <textarea type="text" name="summary" value={form.summary} onChange={onChange} className={"form-control"} />
                                            {/* <InputError submitted={submitted} error={error} name="personName" /> */}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <div className="text-center pb-2 pt-2">
                                    <Button onClick={() => navigate(`/books`)} variant={"light"} className="customBtn mr-md-4 mr-1">
                                        Back
                                    </Button>
                                    <Button variant="primary" onClick={onSubmit} className="customBtn" >
                                        {id ? "Update" : "Submit"}
                                    </Button>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </Col></div>
            </Row>
        </>
    );
};

export default BookEdit;

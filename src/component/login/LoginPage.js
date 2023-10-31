import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Col, FormGroup, Label, Row, Input } from "reactstrap";
import toastr from "toastr";
import { signIn } from "../../_helper/CallApi/authService";
import { setSession } from "../../_helper/ApiConfig/API_AUTH";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate()
  const onSubmit = async (e) => {
    e.preventDefault();
    let flag = 0;
    if (!email) {
      flag = 1;
    }
    if (!password) {
      flag = 1;
    }
    if (flag == 1) {
      toastr.error("please fill all fields");
      return;
    }
    const res=await signIn({email,password})
    console.log(res);
    if(res?.status==1){
      setSession(res.data.token)
      navigate("/books")
      toastr.success(res.message);
      return
    }
    setSession()
    toastr.error(res?.message);
    return
  };
  return (
    <div className="login-container">
      <div className="home-container">
        <div className="home-content">
          <div className="inner-content">
            <div className="contact-form">
              <div className="form-heading">
                <h1>Login</h1>
              </div>
              <Row sm={12}>
                <Col md={12}>
                  <FormGroup>
                    <Input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      placeholder="Email"
                    />
                  </FormGroup>
                </Col>
                <Col md={12}>
                  <FormGroup >
                    <Input
                      type="password"
                      value={password}
                      className="form-control"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      placeholder="Password"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <div className="search-cabs">
                <Button className="loginButton" onClick={onSubmit}>
                  Login
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

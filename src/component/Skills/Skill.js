import React from 'react';
import { Link } from 'react-router-dom';

function Skill(){
    return(
        <div className="main-tariff">
        <h1>My <span>Skills</span></h1>
        <div className="inner-tariff ">
            {/* <div className='slid-card'> */}
            <div className="tariff-container">
                <div className="inner-box2">
                    <h2>NodeJS</h2>
                    <p>Create many REST APIs and design documented backend in NodeJS and large file handling and database operations in NodeJS.</p>
                    <h3 className="yellow-section">Used in Backend and Connect DataBase</h3>
                </div>
            </div>
            <div className="tariff-container">
                <div className="inner-box2">
                    <h2>ReactJS</h2>
                    <p>Create responsive FrontEnd for PC and Mobile both.</p>
                    <h3 className="yellow-section">Used in FrontEnd and Create responsive websites</h3>
                </div>
            </div>
            <div className="tariff-container">
                <div className="inner-box2">
                    <h2>JavaScript</h2>
                    <p>Create responsive FrontEnd for PC and Mobile both.</p>
                    <h3 className="yellow-section">Used in FrontEnd</h3>
                </div>
            </div>
            <div className="tariff-container">
                <div className="inner-box2">
                    <h2>AWS Services</h2>
                    <p>Used DynamoDB, Cognito Service, S3 Bucket, CloudFront, Route53, Lambda Function, Api Gateway.</p>
                    <h3 className="yellow-section">Web Hosting and DataBase and Authentication</h3>
                </div>
            </div>
            <div className="tariff-container">
                <div className="inner-box2">
                    <h2>HTML</h2>
                    <p>Create responsive FrontEnd for PC and Mobile both.</p>
                    <h3 className="yellow-section">Used in FrontEnd</h3>
                </div>
            </div>
            <div className="tariff-container">
                <div className="inner-box2">
                    <h2>CSS</h2>
                    <p>Create responsive FrontEnd for PC and Mobile both.</p>
                    <h3 className="yellow-section">Used in FrontEnd</h3>
                </div>
            </div>
            <div className="tariff-container">
                <div className="inner-box2">
                    <h2>C++</h2>
                    <p>I used C++ in competitive programming for problem solving on <Link to={"https://www.codechef.com/users/rishabh_7409"}>CodeChef</Link>.</p>
                    <h3 className="yellow-section">Used for competitive programming</h3>
                </div>
            </div>
            <div className="tariff-container">
                <div className="inner-box2">
                    <h2>MySql</h2>
                    <p>Used for a wide range of purposes, including data warehousing, and logging applications.</p>
                    <h3 className="yellow-section">Used in backend for storing things</h3>
                </div>
            </div>
            <div className="tariff-container">
                <div className="inner-box2">
                    <h2>DynamoDB</h2>
                    <p>Create database tables that can store and retrieve any amount of data and serve any level of request traffic.</p>
                    <h3 className="yellow-section">Used in backend for storing things</h3>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Skill
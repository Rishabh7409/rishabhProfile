// Import necessary React and other components
import React, { useEffect } from "react"; // You can create your own CSS for styling

import { Link, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { setSession } from "../_helper/ApiConfig/API_AUTH";
import { getUsers } from "../_helper/CallApi/authService";

// Create a functional component for your travel website
function TravelWebsite() {
  const navigate=useNavigate()
  useEffect(()=>{
    (async()=>{
      let res=await getUsers()
      console.log('====================================');
      console.log(res);
      console.log('====================================');
    })()
  },[])
  return (
    <div className="travel-website">
      
    {/* <Navbar/> */}
    <Button className="loginButton" onClick={(e)=>{
      e.preventDefault()
      setSession()
navigate("/login")
    }}>LogOff</Button>
    {/* <BooKing/>
    <FastBooking/>
    <CarsCollection/>
    <CarFooter/>  */}
       </div>

    // <div className="home-container">
    //   <div className="home-content">

    //     <div className="inner-content">
    //       <div className="contact-form">
    //         <div className="form-heading">
    //           <h1>Login Form</h1>
    //         </div>
    //         <div className="form-fields">
    //           <input type="text" placeholder="name" />
    //           <br />
    //           <input type="number" placeholder="phone" />
    //           <br />
    //           <input type="email" placeholder="Email" />
    //           <br />
    //           <input type="password" placeholder="Password" />
    //         </div>
    //         <div className="search-cabs">
    //           <a href="#">Login</a>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default TravelWebsite;

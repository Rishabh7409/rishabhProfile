import React, { useState } from 'react';
import logo from "../NavBaar/logo.jpeg"
import { Link } from 'react-router-dom';

const Navbar = () => {
  // let menubar = document.querySelector('#menu-bars')
  // let mynav = document.querySelector('.navbar');

  // menubar.onclick = (e) => {
  //   e.preventdefault()
  //   menubar.classList.toggle('fa-times');
  //   mynav.classList.toggle('active');
  // }

  return (
    <div className="main-container">
  
      <header className="header">
        <a href="/" id="logo"><img className='image' src={logo} width="100px" /></a>       <h1 className='mt-4'>Rishabh Patel <br />
        <h1>Software Developer</h1></h1>
     
        <nav className="navbar justify-content-end">
          <a > <Link to={"/login"}>Login</Link></a>
        </nav>
        <a  id="menu-bars" className="fas fa-bars"></a>
      </header>
     
    </div>
  );
};

export default Navbar;

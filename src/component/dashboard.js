
import React from 'react';
import { useNavigate } from "react-router-dom";
import Skill from './Skills/Skill';
import Experience from './ExpAndAbout/Experience';
import Education from './Footer/Education';
import Navbar from './NavBaar/Navbar';
import Discription from './ExpAndAbout/Discription';

function DashBoard() {
    
  const navigate = useNavigate();
  return (
    <>
    <Navbar/>
    <Discription/>
    <Skill/>
    <Experience/>
    <Education/>
    </>
    // <div className="dashboard">
    //   <header>
    //     <h1>Travel Explorer</h1>
    //   </header>
    //   <main>
    //     <section className="search">
    //       <h2>Find Your Adventure</h2>
    //       <div className="search-form">
    //         <input type="text" placeholder="Destination" />
    //         <input type="date" />
    //         <input type="date" />
    //         <button onClick={()=>{navigate("/sample")}}>Search</button>
    //       </div>
    //     </section>
    //     <section className="popular-destinations">
    //       <h2>Popular Destinations</h2>
    //     </section>
    //   </main>
    //   <footer>
    //     <p>&copy; 2023 Travel Explorer</p>
    //   </footer>
    // </div>
  );
}

export default DashBoard;

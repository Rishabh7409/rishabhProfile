import React from "react";
import { Link } from "react-router-dom";

function Experience() {
  return (  <div className="main-tariff">
  <h1>Work <span>Experience</span></h1>
      {/* <h1 className="fast-heading">Work Experience</h1> */}
      <div className="inner-fast d-flex justify-content-bitween">
        <div className="tariff-container">
          <div className="inner-fast-text">
            <h1>
              <Link to={"https://www.codefire.org/"}>
                Codefire Technology Noida
              </Link>
            </h1>
            <p className="yellow-section ">May 2023 to Present</p>
            <p>
              Software Developer with expertise in web technologies such as
              Node.js, JavaScript, and React.js. Proficient in SequelizeDB and
              MySQL for efficient data management. Skilled in working with Linux
              Operating System, adept at web development, integration,
              regression testing, debugging, and performance benchmarking &
              tuning. Demonstrated experience in utilizing a diverse skill set
              to contribute effectively to the company's projects and
              objectivesr an inanimate object.
            </p>
          </div>
        </div>
        <div className="tariff-container">
          <div className="inner-fast-text">
            <h1>
              <Link to={"https://linkwheelie.com/"}>
                Sharpheads Technology Noida
              </Link>
            </h1>
            <p className="yellow-section">May 2022 to May 2022</p>
            <p>
              Associate Software Developer proficient in web technologies like
              Node.js, JavaScript, HTML5, and CSS3. Expertise in database
              management using DynamoDB and MySql, and leveraging AWS services
              including S3 bucket, Cognito service, and AWS code
              deployment.Adhering to Agile Software Development Methodology
              within the SDLC. Demonstrated proficiency in web
              development,testing, debugging, contributing effectively to the
              company's projects.
            </p>
          </div>
        </div>
        <div className="tariff-container">
          <div className="inner-fast-text">
            <h1>
              <Link to={"https://www.thesparksfoundationsingapore.org/"}>
                The Sparks Foundation
              </Link>
            </h1>
            <p className="yellow-section">Oct 2021 to Nov 2021</p>
            <p>
              Interned as a Machine Learning and Business Analytics Intern,
              gaining valuable experience in implementing various machine
              learning algorithms for data analysis and insights
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Experience;

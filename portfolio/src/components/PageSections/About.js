import React, { useEffect, useState } from 'react';
import profile from "../../images/profile.png";

import { Link, animateScroll as scroll } from "react-scroll";

function About() {

    return (
        <div id="nav-about">
            <section className="page-section" id="about">
                <div className="section-title-container">
                    <div className="section-title">ABOUT</div>
                    <div className="section-title-underline"></div>
                </div>
                {/* I'm a Front-End Developer for ChowNow in Los Angeles, CA.
I have serious passion for UI effects, animations and creating intuitive, dynamic user experiences.
Let's make something special. */}
                <div className="flex-row">
                    <div id="about-row-left">
                        <img id="profile-image" src={profile}></img>
                        <h3 id="about-title" className="small-title">Who am I?</h3>
                        <p id="about-text" className="text">
                            I'm a full stack web developer and <a className="about-link" href="https://lambdaschool.com/">Lambda School</a> graduate.<br />
                            I have serious passion for creating awesome-looking websites with amazing functionality.<br />
                            <Link to="nav-contact" spy={true} smooth={true} offset={50} duration={500}><div className="about-link">Lets make something great!</div></Link>
                        </p>
                    </div>
                </div>

            </section>
        </div>
    );

}

export default About;

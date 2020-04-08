import React, { useEffect, useState } from 'react';
import profile from "../../images/profile.png";

function About() {

    return (
        <section className="page-section" id="about">
            <div className="section-title-container">
                <div className="section-title">ABOUT</div>
                <div className="section-title-underline"></div>
            </div>

            <div className="flex-row">
                <div id="about-row-left">
                    <img id="profile-image" src={profile}></img>
                    <h3 id="about-title" className="small-title">Who am I?</h3>
                    <p id="about-text" className="text">ASDAISN isandisnf difnsdof insoifdns dofns indfin soid.<br/>a new lione hello hello wassup asjkdajsda jh adjha jsdha jsdhajsd hsdjahjsda.<br/>Call To Action Now Here.</p>
                </div>
            </div>

        </section>
    );

}

export default About;

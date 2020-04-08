import React, { useEffect, useState } from 'react';

function About() {

    return (
        <section className="page-section" id="skills">
            <div className="section-title-container">
                <div className="section-title">SKILLS</div>
                <div className="section-title-underline"></div>
            </div>

            <div id="skill-list">
                <div className="skill-container">
                <div className="skill">React</div><div className="skill-bar"/><div className="skill-checkmark">✓</div></div>

                <div className="skill-container"> <div className="skill-offset" />
                <div className="skill">Javascript</div><div className="skill-bar"/><div className="skill-checkmark">✓</div></div>

                <div className="skill-container"> <div className="skill-offset" /><div className="skill-offset" /> 
                <div className="skill">CSS</div><div className="skill-bar"/><div className="skill-checkmark">✓</div></div>

                <div className="skill-container"> <div className="skill-offset" /><div className="skill-offset" /><div className="skill-offset" /> 
                <div className="skill">HTML</div><div className="skill-bar"/><div className="skill-checkmark">✓</div></div>

                <div className="skill-container"> <div className="skill-offset" /><div className="skill-offset" /><div className="skill-offset" /><div className="skill-offset" />
                <div className="skill">Node.js</div><div className="skill-bar"/><div className="skill-checkmark">✓</div></div>

                <div className="skill-container"> <div className="skill-offset" /><div className="skill-offset" /><div className="skill-offset" /><div className="skill-offset" /><div className="skill-offset" />
                <div className="skill">Express</div><div className="skill-bar"/><div className="skill-checkmark">✓</div></div>
            </div>

        </section>
    );

}

export default About;

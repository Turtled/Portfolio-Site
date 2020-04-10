import React, { useEffect, useState } from 'react';

function Contact() {

    const [successId, setSuccessId] = useState("success-hidden");

    return (
        <div id="nav-contact">
            <svg preserveAspectRatio="none" viewBox="0 0 100 102" height="75" width="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" class="svgcolor-light">
                <path d="M0 0 L50 100 L100 0 Z" fill="white" stroke="white"></path>
            </svg>
            <section className="page-section" id="contact">
                <div className="section-title-container">
                    <div id="contact-title" className="section-title">CONTACT</div>
                    <div id="contact-title-underline" className="section-title-underline"></div>
                </div>

                <div id="contact-subtitle">Have a question or want to work together? Email me!</div>

                <form id="contact-form" name="contact" method="POST" data-netlify="true">
                    <input type="text" placeholder="Your Name" className="contact-form-input" id="name"></input>
                    <input type="email" placeholder="Your Email Address" className="contact-form-input" id="email"></input>
                    <textarea type="text" placeholder="Your Message" className="contact-form-input" id="message"></textarea>
                    <div id={successId}><div id="success-text">Your message was sent successfully. Thanks!</div><div onClick={() => {setSuccessId("success-hidden")}} id="success-close"></div></div>
                    <div onClick={() => {setSuccessId("success")}} id="submit-button">SUBMIT</div>
                </form>

            </section>
        </div>
    );

}

export default Contact;

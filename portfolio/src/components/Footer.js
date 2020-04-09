import React, { useEffect, useState } from 'react';

import { Link, animateScroll as scroll } from "react-scroll";

function Footer() {

    return (
        <div id="footer">
            <Link to="nav-home" spy={true} smooth={true} offset={0} duration={500}><div id="back-to-top"></div></Link>
            <div>
                <div id="footer-links">
                    <a href="https://www.linkedin.com/in/daniel-firpo/" target="_blank"><div className="footer-link" id="linkedin-icon" /></a> {/*LinkedIn*/}
                    <a href="https://github.com/turtled" target="_blank"><div className="footer-link" id="github-icon" /></a> {/*GitHub*/}
                    <a href="https://twitter.com/DanielFirpo2" target="_blank"><div className="footer-link" id="twitter-icon" /></a> {/*Twittah*/}
                </div>
                <div className="copyright" id="signature">DANIEL FIRPO · 2020</div>
                <div className="copyright">DESIGN INSPIRATION FROM <a href="http://findmatthew.com/" id="copyright-year">FINDMATTHEW.COM</a>.</div>
            </div>
        </div>
    );

}

export default Footer;

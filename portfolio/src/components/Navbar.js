import React, { useEffect, useState } from 'react';

function Navbar() {

    useEffect(() => {
        window.addEventListener('scroll', updateNavbarState)
    }, [])

    const [navClass, setNavClass] = useState(" relative");
    let navRef = React.createRef();

    return (
        <div ref={navRef} className={navClass + "-navbar-container"}>
            <div className={"navbar" + navClass}>
                <div id="navbar-item-selected" className="navbar-item">HOME</div>
                <div className="navbar-item">ABOUT</div>
                <div className="navbar-item">SKILLS</div>
                <div className="navbar-item">PROJECTS</div>
                <div className="navbar-item">CONTACT</div>
            </div>
            <div className="navbar-placeholder"></div>
        </div>
    );

    function updateNavbarState() {

        if (window.pageYOffset > window.innerHeight) {
            console.log("SETTING FIXED")
            setNavClass(" fixed");
        }
        else {
            setNavClass(" relative")
            console.log("SETTING RELATIVE")
        }
    }

}

export default Navbar;

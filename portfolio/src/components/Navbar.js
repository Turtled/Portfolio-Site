import React, { useEffect, useState } from 'react';

function Navbar() {

    useEffect(() => {
        window.addEventListener('scroll', updateNavbarState)
    }, [])

    const [navClass, setNavClass] = useState(" relative");
    let navRef = React.createRef();

    return (
        <div ref={navRef} className={"navbar" + navClass}>
            TEST
        </div>
    );
    
    function updateNavbarState () {
        
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

import React, { useEffect, useState } from 'react'
import './Nav.css';

function Nav() {
    const [show, handleShow] = useState(false);

    // Code for black at top of Nav bar. when we move down it appears black, but otherwise it doesnt sgow black. Rather banner shows there at the top with 2 logos in Original Netflix.
    useEffect(() => {
        window.addEventListener("scroll",() =>{
            if(window.scrollY > 100){ //when i'm 100px down then black bg occurs, otherwwise NOT.
                handleShow(true);
            }
            else handleShow(false);
        });
        return () => {
            window.removeEventListener("scroll"); // every time useEffect is fired up, this remove previous listeners
        }
    }, [])
    return (
        <div className={`nav ${show && "nav_black"}`}>
            <img 
             className="nav_logo"
             src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
             alt="Netflix Logo" 
             />

             <img 
              className="nav_avatar"
              src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
              alt="Netflix Logo"
             />
        </div>
    )
}

export default Nav

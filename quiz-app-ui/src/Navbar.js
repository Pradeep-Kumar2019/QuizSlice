// Navbar.js

import React from 'react';
import AppBar from '@material-ui/core/AppBar';

const NavBar = () => {
    return(
        <div>
            <AppBar position="static">
                <h1 className="textlabel h2style">QuizSlice</h1> 
                <h5 className="tagclass"> Your chance to finally show what you know !! </h5>
            </AppBar>
        </div>
    )
}
export default NavBar;
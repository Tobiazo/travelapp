import React from "react"
import { NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";

function Header(){
    return (
        <div id="header">
            <div id="linksContainer">
                <div class="links" >
                <NavLink id="navtohome" to ="/"> EventyrListen </NavLink>
                <Button/>
                </div>
            </div>
        </div> 
         
    )
}

export default Header;
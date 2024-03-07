import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Button(){

    const bruker = localStorage.getItem("loggedIn")

    const LogOut = (e) => {
        e.preventDefault()
        localStorage.setItem("loggedIn", "")
        window.location.reload(false)
    }

    return(
        <div className={"buttonContainer"}>

                
                <div class="links">
                <NavLink className="float" id="navlinklogginn" to ="/Login">{!bruker && "Login"}  </NavLink>
                
                <NavLink className="float" id="navlinklogginn" to ="/Login"  onClick={LogOut}> {bruker && "LogOut"}  </NavLink>
            </div>

        </div>
    )}

    export default Button;

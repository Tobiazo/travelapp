import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Button(){
    return(
        <div className={"buttonContainer"}>
            
                <div id="links">
                <NavLink className="float" id="navlinklogginn" to ="/Login"> Login </NavLink>
                
            </div>

        </div>
    )}

    export default Button;


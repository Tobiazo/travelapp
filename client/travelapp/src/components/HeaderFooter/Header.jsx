// Header.js
import React from "react";
import { NavLink } from "react-router-dom";
import Button from "./Button";

function Header() {
  const LogOut = (e) => {
    e.preventDefault()
    localStorage.setItem("loggedIn", "")
    window.location.reload(false)
}

  return (
    <div id="header">
      <div id="linksContainer">
        <div id="links">
          <NavLink id="navtohome" to="/">
            EventyrListen
          </NavLink>

          <div className="dropdown">
            <Button className="dropbtn" />
            <div className="dropdown-content">
                <NavLink className="dropdownLink" to ="/minevurderinger">{'Mine vurderinger'}  </NavLink><br/>
                <NavLink className="dropdownLink" to ="/minevurderinger">{'Link 2'}  </NavLink><br/>
                <NavLink className="dropdownLink" id="navlinklogginn" to ="/Login"  onClick={LogOut}>{'Logg ut'}  </NavLink><br/>
              
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Header;

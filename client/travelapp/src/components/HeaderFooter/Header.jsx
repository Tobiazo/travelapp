// Header.js
import React from "react";
import { NavLink } from "react-router-dom";
import Button from "./Button";

function Header() {
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
                <NavLink className="dropdownLink" to ="/minevurderinger">{'Link 3'}  </NavLink><br/>
              
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Header;

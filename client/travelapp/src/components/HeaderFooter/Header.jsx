import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const bruker = localStorage.getItem("loggedIn");

    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/users/find/${bruker}`);
        const userData = response.data;
        setUsername(userData.username); 
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (bruker) {
      fetchUser();
    }
  }, []);

  const toggleDropdown = () => {
    console.log("Dropdown toggled");
    setIsDropdownOpen(!isDropdownOpen);
  };

  const LogOut = (e) => {
    e.preventDefault();
    localStorage.setItem("loggedIn", "");
    window.location.reload(false);
  };

  const isLoggedIn = localStorage.getItem("loggedIn");

  return (
    <div id="header">
      <div id="linksContainer">
        <div id="links">
          <NavLink id="navtohome" to="/">
            EventyrListen
          </NavLink>

          {/* Render login/logout button */}
          {isLoggedIn ? (
            <NavLink className="navlink" id="navlinklogginn" onClick={toggleDropdown}>
              {username} {"▽"}
            </NavLink>
          ) : (
            <NavLink className="navlink" id="navlinklogginn" to="/Login">
              Logg inn
            </NavLink>
          )}

          {/* Dropdown content */}
          {isLoggedIn && (
            <div className="dropdown">
              <div className="dropdown-content" style={{ display: isDropdownOpen ? 'block' : 'none' }} id="dropdownContent">
                <NavLink className="dropdownLink" to="/minevurderinger">{'Mine vurderinger'}</NavLink><br/>
                <NavLink className="dropdownLink" to="/upload">{'Legg til destinasjon'}</NavLink><br/>
                <NavLink className="dropdownLink" to="/Login" onClick={LogOut}>{'Logg ut'}</NavLink><br/>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

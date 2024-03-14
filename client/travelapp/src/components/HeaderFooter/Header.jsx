import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const LogOut = (e) => {
    e.preventDefault();
    localStorage.setItem("loggedIn", "");
    window.location.reload(false);
  };

  let navigate = useNavigate();
  const newDestination = () => {
    navigate("/newDestination");
  };

  const mineVurderinger = () => {
    navigate("/minevurderinger");
  };
  const mainPaige = (e) => {
    navigate("/");
  };

  const isLoggedIn = localStorage.getItem("loggedIn");

  return (
    <div id="header">
      <div id="logo">
        <div id="naviger">
          <NavLink id="navtohome" to="/">
            EventyrListen
          </NavLink>
        </div>
      </div>

      {/* Render login/logout button */}
      {isLoggedIn ? (
        <div id="userDropdown">
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            Meny
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={mainPaige}>Hovedside</MenuItem>
            <MenuItem onClick={mineVurderinger}>Mine vurderinger</MenuItem>
            <MenuItem onClick={newDestination}>Legg til destinasjon</MenuItem>
            <MenuItem onClick={LogOut}>Logg ut</MenuItem>
          </Menu>
        </div>
      ) : (
        <NavLink className="navlink" id="navlinklogginn" to="/Login">
          Logg inn
        </NavLink>
      )}
    </div>
  );
};

export default Header;

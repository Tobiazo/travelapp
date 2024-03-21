import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";

const Header = () => {
  const isLoggedIn = localStorage.getItem("loggedIn");
  const [user, setUser] = useState(null);
  const bruker = localStorage.getItem("loggedIn");
  const isAdmin = user && user.isAdmin;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/users/find/${bruker}`);
        const userData = response.data;

        if (response.status === 200) {
          setUser(userData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [bruker]);

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
  const mineDestinasjoner = () => {
    navigate("/mineDestinasjoner");
  };

  useEffect(() => {
    document.getElementById("dark-icon").setAttribute("display", isDark ? "none" : "block");
    document.getElementById("light-icon").setAttribute("display", isDark ? "block" : "none");
    document.getElementById("root").setAttribute("data-theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <div id="header" className={isAdmin ? "admin-header" : ""}>
      <div id="logo">
        <div id="naviger">
          <NavLink id="navtohome" to="/">
            EventyrListen
          </NavLink>
        </div>
      </div>
      <div className="darkmode">
        <button onClick={() => setIsDark(!isDark)} id="darkmodebutton">
          <svg width="30" height="30" id="light-icon">
            <circle cx="15" cy="15" r="6" fill="currentColor" />

            <line
              id="ray"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              x1="15"
              y1="1"
              x2="15"
              y2="4"
            ></line>

            <use href="#ray" transform="rotate(45 15 15)" />
            <use href="#ray" transform="rotate(90 15 15)" />
            <use href="#ray" transform="rotate(135 15 15)" />
            <use href="#ray" transform="rotate(180 15 15)" />
            <use href="#ray" transform="rotate(225 15 15)" />
            <use href="#ray" transform="rotate(270 15 15)" />
            <use href="#ray" transform="rotate(315 15 15)" />
          </svg>

          <svg width="30" height="30" id="dark-icon">
            <path
              fill="currentColor"
              d="
          M 23, 5
          A 12 12 0 1 0 23, 25
          A 12 12 0 0 1 23, 5"
            />
          </svg>
        </button>
      </div>
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
            <MenuItem onClick={mineDestinasjoner}>Mine destinasjoner</MenuItem>
            <MenuItem onClick={mineVurderinger}>Mine vurderinger</MenuItem>
            <MenuItem onClick={newDestination}>Legg til destinasjon</MenuItem>
            <MenuItem onClick={LogOut}>Logg ut</MenuItem>
          </Menu>
        </div>
      ) : (
        <div id="naviger">
          <NavLink className="navlink" id="navlinklogginn" to="/Login">
            Logg inn
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Header;

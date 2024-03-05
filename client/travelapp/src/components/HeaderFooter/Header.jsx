import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropdownOpen: false
    };
  }

  toggleDropdown = () => {
    console.log("Dropdown toggled");
    this.setState({ isDropdownOpen: !this.state.isDropdownOpen });
  }

  LogOut = (e) => {
    e.preventDefault();
    localStorage.setItem("loggedIn", "");
    window.location.reload(false);
  }

  render() {
    const isLoggedIn = localStorage.getItem("loggedIn"); // Assuming you set this value when the user logs in

    return (
      <div id="header">
        <div id="linksContainer">
          <div id="links">
            <NavLink id="navtohome" to="/">
              EventyrListen
            </NavLink>

            {/*lager logginn/brukernavn-knapp*/}
            {isLoggedIn ? (
              <NavLink className="navlink" id="navlinklogginn" onClick={this.toggleDropdown}>
                Brukernavn
              </NavLink>
            ) : (
              <NavLink className="navlink" id="navlinklogginn" to="/Login">
                Logg inn
              </NavLink>
            )}

            {/* Innholdet i dropdown-menyen */}
            {isLoggedIn && (
              <div className="dropdown">
                <div className="dropdown-content" style={{ display: this.state.isDropdownOpen ? 'block' : 'none' }} id="dropdownContent">
                  <NavLink className="dropdownLink" to="/minevurderinger">{'Mine vurderinger'}</NavLink><br/>
                  <NavLink className="dropdownLink" to="/minevurderinger">{'Legg til destinasjon'}</NavLink><br/>
                  <NavLink className="dropdownLink" id="navlinklogginn" to="/Login" onClick={this.LogOut}>{'Logg ut'}</NavLink><br/>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Header;

import React, { useState } from "react";
import Dropdown from 'react-dropdown';
import { NavLink } from 'react-router-dom';

// Mal for å finne ut av dropdown for sidepanel
const DropdownProfile = () => {
    const options =[
        {label: "Mine Vurderinger", value: "/myReviews"},
        {label: "Logg ut", value: "/logout"}

    ];

    const [value, setValue] = useState(null)

    const LogOut = (e) => {
        e.preventDefault()
        localStorage.setItem("loggedIn", "")
        window.location.reload(false)
    }

    const handleChange = (selectedOptions) => {setValue(selectedOptions.value);
    if (setValue(selectedOptions.value) === "/logout"){
        LogOut();
    }
};
	
 
        
    return(
        <div id="mainDropdown">
           {/*  <button
            className="toggle"
    onClick={} => setNavbar/}*/}
             <Dropdown
            placeholder="##Profilnamn##"
            label="Min profil"
            options={options}
            value={value}
            onChange={handleChange}
            />  

      </div>  
    )
    
};

export default DropdownProfile;
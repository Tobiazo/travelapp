import React from "react";
import Dropdown from 'react-dropdown';


const DropdownProfile = () => {
    const options =[
        {label: "Mine Vurderinger", value: "myReviews"},
        {label: "Logg ut", value: "logout"}

    ];

    const [value,, setValue] = React.useState("")

    const handleChange = (event) => {setValue(event.target.value);};
	
        
    return(
        <div id="mainDropdown">
           
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
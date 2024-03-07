import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ContinuousSlider from "./ContinuousSlider";
import TempSlider from "./Tempslider";
import { useFilter } from "../FilterProvider";

function Sidebar(){
    /* Filter ser slik ut [[ratingMin, RatingMax], [tags], [kontinenter], klima, showVisisted] */
    const {filter, setFilter} = useFilter()

    const handleBesøktChange = (event) => {
        const newFilter = [...filter]
        newFilter[4] = event.target.value
        setFilter(newFilter)
        console.log(filter)
      };

      const handleKontinenterChange = (event) => {
        const newFilter = [...filter];
        const checkedValue = event.target.value;
        const isChecked = event.target.checked;
        
       
        const index = newFilter[2].indexOf(checkedValue);
      
        if (isChecked && index === -1) {
          newFilter[2].push(checkedValue);
        } else if (!isChecked && index !== -1) {

          newFilter[2].splice(index, 1);
        }
        setFilter(newFilter);
      };

    return (
        <>
        
        <div id="sidebar">

           <p class="links"> <NavLink to ="/noSidebar"> &gt; </NavLink>FILTER</p> 


           <div id="Besøkt/Ubesøkt">
           <label> Besøkt/Ubesøkt </label>
           <select onChange={handleBesøktChange} name="Besøkte" id="" >
                <option value="Vis Begge">Vis Begge</option>
                <option value="Kun Besøkte">Kun Besøkte</option>
                <option value="Kun Ubesøkte">Kun Ubesøkte</option>
            </select>
            </div>
            <br />

            <label> Kontinenter: </label>
            <div id="kontinentCheckboxContainer" onChange={handleKontinenterChange}>
                
                <input type="checkbox" /> <label> Europa</label>
                <br />
                <input type="checkbox" name="Nord-Amerika"/> <label for="Nord-Amerika"> Nord-Amerika</label>
                <br />
                <input type="checkbox" /> <label> Sør-Amerika</label>
                <br />
                <input type="checkbox" /> <label> Asia</label> 
                <br />
                <input type="checkbox" /> <label> Afrika</label>
                <br />
                <input type="checkbox" /> <label> Oceania</label>
            </div>
            <div id="tagsContainer">
                <label> Tags </label>
                <select name="Besøkte" id="">
                        <option value="Ingen">Ingen</option>
                        <option value="Tag1">Sykkling</option>
                </select>
            </div>

            <p>⭐Vurdering:</p>
        
           <ContinuousSlider/>
           <p>Temp:</p>
           <TempSlider/>
        </div> 
        </>
    )
}


export default Sidebar;

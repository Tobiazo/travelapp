import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ContinuousSlider from "./ContinuousSlider";
import TempSlider from "./Tempslider";

function Sidebar() {
  return (
    <div id="sidebar">
      <p class="links">
        {" "}
        <NavLink to="/noSidebar"> &gt; </NavLink>FILTER
      </p>
      <div id="Besøkt/Ubesøkt">
        <label> Besøkt/Ubesøkt </label>
        <select name="Besøkte" id="">
          <option value="Vis Begge">Vis Begge</option>
          <option value="Kun Besøkte">Kun Besøkte</option>
          <option value="Kun Ubesøkte">Kun Ubesøkte</option>
        </select>
      </div>
      <br />

      <label> Kontinenter: </label>
      <div id="kontinentCheckboxContainer">
        <input type="checkbox" /> <label> Europa</label>
        <br />
        <input type="checkbox" name="Nord-Amerika" />{" "}
        <label for="Nord-Amerika"> Nord-Amerika</label>
        <br />
        <input type="checkbox" /> <label> Sør-Amerika</label>
        <br />
        <input type="checkbox" /> <label> Asia</label>
        <br />
        <input type="checkbox" /> <label> Afrika</label>
        <br />
        <input type="checkbox" /> <label> Oseania</label>
      </div>
      <div id="tagsContainer">
        <label> Tags </label>
        <select name="Besøkte" id="">
          <option value="Ingen">Ingen</option>
          <option value="Tag1">Sykkling</option>
        </select>
      </div>

      <p>⭐Vurdering:</p>

function Sidebar(){
    return (
        <div id="sidebar">

           <p>FILTER</p> 
           <div id="Besøkt/Ubesøkt">
           <label> Besøkt: </label> <br />
           <input type="checkbox" /> <label> Ja </label> <br />
           <input type="checkbox" /> <label> Nei </label> <br />
           <input type="checkbox" /> <label> Vis begge </label> <br />
               

            </div>
            <br />

            <label> Kontinenter: </label>
            <div id="kontinentCheckboxContainer">
                
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
           <p>🌡️ Temp:</p>
           <TempSlider/>
        </div> 
    )
}

export default Sidebar;
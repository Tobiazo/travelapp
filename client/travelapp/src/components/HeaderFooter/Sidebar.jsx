import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ContinuousSlider from "./ContinuousSlider";
import TempSlider from "./Tempslider";
import { useFilter } from "../FilterProvider";
import "../../styles/HeaderFooter.css";
import sidetabimg from "../../bilder/sidetab.png";

function Sidebar() {
  /* Filter ser slik ut [[ratingMin, RatingMax], [tags], [kontinenter], klima, showVisisted] */
  const { filter, setFilter } = useFilter();

  const handleBesøktChange = (event) => {
    const newFilter = [...filter];
    newFilter[4] = event.target.value;
    setFilter(newFilter);
    console.log(filter);
  };

  const handleKontinenterChange = (event) => {
    const newFilter = [...filter];
    const checkedValue = event.target.value;
    console.log("\n\n\n\n")
    console.log(checkedValue)
    console.log("\n\n\n\n")
    const isChecked = event.target.checked;

    const index = newFilter[2].indexOf(checkedValue);

    if (isChecked && index === -1) {
      newFilter[2].push(checkedValue);
    } else if (!isChecked && index !== -1) {
      newFilter[2].splice(index, 1);
    }
    setFilter(newFilter);
  };

  const handleKlimaChange = (event) => {
    const newFilter = [...filter];
    const checkedValue = event.target.value;
    newFilter[3] = checkedValue
    setFilter(newFilter);
  };

  return (
    <>
      <div id="sidebar">
        <NavLink to="/noSidebar">
          <div id="sidetab2">
            <img id="sidetabimg2" src={sidetabimg}></img>
          </div>
        </NavLink>

        <div id="Besøkt/Ubesøkt">
          <label> Besøkt/Ubesøkt </label>
          <select onChange={handleBesøktChange} name="Besøkte" id="">
            <option value="Vis Begge">Vis Begge</option>
            <option value="Kun Besøkte">Kun Besøkte</option>
            <option value="Kun Ubesøkte">Kun Ubesøkte</option>
          </select>
        </div>
        <br />
        
        <br />

        <label> Kontinenter: </label>
        <div id="kontinentCheckboxContainer" onChange={handleKontinenterChange}>
          <input type="checkbox" value="Europa"/> <label> Europa</label>
          <br />
          <input type="checkbox" value="Nord-Amerika" /> <label for="Nord-Amerika"> Nord-Amerika</label>
          <br />
          <input type="checkbox" value="Sør-Amerika"/> <label> Sør-Amerika</label>
          <br />
          <input type="checkbox" value="Asia"/> <label> Asia</label>
          <br />
          <input type="checkbox" value="Afrika"/> <label> Afrika</label>
          <br />
          <input type="checkbox" value="Oseania"/> <label> Oseania</label>
        </div>
        <div id="tagsContainer">
          <label> Tags </label>
          <select name="Besøkte" id="">
            <option value="Ingen">Ingen</option>
            <option value="Tag1">Sykkling</option>
          </select>
        </div>

        <div id="vurderingsboks-top">
          <p className="rating-star-sidebar">&#9733;</p>
          <p id="vurdering-tekst"> Vurdering: </p>
        </div>
        <ContinuousSlider />
        <div id="temp-tekst-boks">
          <p id="temp-tekst"> 🌍 Klima:</p>
        </div>
        <div id ="klimaRadioButtons" onChange={handleKlimaChange}>
            <input class="klimaRadioButton" type="radio" name="klima" value="" />
            <label htmlFor="">Alle </label>
            <input class="klimaRadioButton" type="radio" id="varmt" name="klima" value="Varmt" />
            <label htmlFor="varmt">Varmt </label>

            <input class="klimaRadioButton" type="radio" id="kaldt" name="klima" value="Kaldt" />
            <label htmlFor="kaldt">Kaldt </label>

            <input class="klimaRadioButton" type="radio" id="temperert" name="klima" value="Temperert" />
            <label htmlFor="temperert">Temperert </label>
        </div>
      </div>
    </>
  );
}

export default Sidebar;

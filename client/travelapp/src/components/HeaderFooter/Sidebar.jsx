import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import ContinuousSlider from "./ContinuousSlider";
import { useFilter } from "../FilterProvider";
import "../../styles/HeaderFooter.css";
import sidetabimg from "../../bilder/sidetab.png";
import { AnbefalteDestContext } from "../AnbefalteDestProvider";

function Sidebar() {
  /* Filter ser slik ut [[ratingMin, RatingMax], [tags], [kontinenter], klima, showVisisted] */
  const { filter, setFilter } = useFilter();
  const {setVisAnbefalinger} = useContext(AnbefalteDestContext);

  const handleBesøktChange = (event) => {
    const newFilter = [...filter];
    newFilter[4] = event.target.value;
    setFilter(newFilter);
    console.log(filter);
  };

  const handleKontinenterChange = (event) => {
    const newFilter = [...filter];
    const checkedValue = event.target.value;
    console.log("\n\n\n\n");
    console.log(checkedValue);
    console.log("\n\n\n\n");
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
    newFilter[3] = checkedValue;
    setFilter(newFilter);
  };

  const handleTagChange = () => {
    const newFilter = [...filter];
    const checkedValue = selectedOptions;
    newFilter[1] = checkedValue;
    setFilter(newFilter);
  };

  const [selectedOptions, setSelectedOptions] = useState([]);
  const options = [
    "Fjell",
    "Ski",
    "Kultur",
    "Bading",
    "Storby",
    "Historie",
    "Shopping",
    "Sol",
  ];

  const handleSelect = (event) => {
    const value = event.target.value;
    if (!selectedOptions.includes(value)) {
      setSelectedOptions([...selectedOptions, value]);
    }
  };

  const removeOption = (optionToRemove) => {
    setSelectedOptions(
      selectedOptions.filter((option) => option !== optionToRemove)
    );
  };

  const handleAnbefalingerChange = (event) => {
    setVisAnbefalinger(event.target.value === "Vis anbefalinger");
  };
  

  return (
    <>
      <div id="sidebar">
        <NavLink to="/noSidebar">
          <div id="sidetab2">
            <img id="sidetabimg2" src={sidetabimg} alt="IMG goes here"></img>
          </div>
        </NavLink>

        {localStorage.getItem("loggedIn") && (
          <div id="Besøkt/Ubesøkt">
            <label> Besøkt/Ubesøkt </label>
            <select onChange={handleBesøktChange} name="Besøkte" id="">
              <option value="Vis Begge">Vis Begge</option>
              <option value="Kun Besøkte">Kun Besøkte</option>
              <option value="Kun Ubesøkte">Kun Ubesøkte</option>
            </select>
          </div>
        )}
        <br />
         {localStorage.getItem("loggedIn") && (
        <div id="toggle-anbefalinger">
          <label>Anbefalte destinasjoner</label>
          <select onChange={handleAnbefalingerChange} name="" id="">
            <option value="Vis anbefalinger">Vis anbefalinger</option>
            <option value="Skjul anbefalinger">Skjul anbefalinger</option>
          </select> 
        </div>
         )}
        <br />

        <label> Kontinenter: </label>
        <div id="kontinentCheckboxContainer" onChange={handleKontinenterChange}>
          <input type="checkbox" value="Europa" /> <label> Europa</label>
          <br />
          <input type="checkbox" value="Nord-Amerika" />{" "}
          <label for="Nord-Amerika"> Nord-Amerika</label>
          <br />
          <input type="checkbox" value="Sør-Amerika" />{" "}
          <label> Sør-Amerika</label>
          <br />
          <input type="checkbox" value="Asia" /> <label> Asia</label>
          <br />
          <input type="checkbox" value="Afrika" /> <label> Afrika</label>
          <br />
          <input type="checkbox" value="Oseania" /> <label> Oseania</label>
        </div>

        <div class="form-group">
          <select class="select" onChange={handleSelect} value="">
            <option value="">Velg en kategori</option>
            {options.map(
              (option) =>
                !selectedOptions.includes(option) && (
                  <option key={option} value={option}>
                    {option}
                  </option>
                )
            )}
          </select>
          <div class="form-group">
            {selectedOptions.map((option) => (
              <span class="kategoriSpan" key={option}>
                {option}{" "}
                <button
                  class="form-button"
                  onClick={() => removeOption(option)}
                >
                  x
                </button>
              </span>
            ))}
          </div>
        </div>
        <div class="form-group form-button">
          <button onClick={handleTagChange}>Filtrer etter kategori</button>
        </div>

        <div id="vurderingsboks-top">
          <p className="rating-star-sidebar">&#9733;</p>
          <p id="vurdering-tekst"> Vurdering: </p>
        </div>
        <ContinuousSlider />
        <div id="temp-tekst-boks">
          <p id="temp-tekst"> 🌍 Klima:</p>
        </div>
        <div id="klimaRadioButtons" onChange={handleKlimaChange}>
          <input
            class="klimaRadioButton"
            type="radio"
            name="klima"
            value="alle"
          />
          <label htmlFor={null}>Alle </label>
          <input
            class="klimaRadioButton"
            type="radio"
            id="varmt"
            name="klima"
            value="Varmt"
          />
          <label htmlFor="varmt">Varmt </label>

          <input
            class="klimaRadioButton"
            type="radio"
            id="kaldt"
            name="klima"
            value="Kaldt"
          />
          <label htmlFor="kaldt">Kaldt </label>

          <input
            class="klimaRadioButton"
            type="radio"
            id="temperert"
            name="klima"
            value="Temperert"
          />
          <label htmlFor="temperert">Temperert </label>
        </div>
      </div>
    </>
  );
}

export default Sidebar;

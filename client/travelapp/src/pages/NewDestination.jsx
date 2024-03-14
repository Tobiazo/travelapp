import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/NewDestination.css";
import { Navigate } from "react-router-dom";

const NewDestination = () => {
  const [file, setFile] = useState(null);
  const [destination_name, setDestinationName] = useState("");
  const [destination_contry, setDestinationCountry] = useState("");
  const [destination_continent, setDestinationContinent] = useState("");
  const [destination_climate, setDestinationClimate] = useState("");
  const [ShortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const [preview, setPreview] = useState();
  const destinationAuthor = localStorage.getItem("loggedIn");

  const [selectedOptions, setSelectedOptions] = useState([]);
  const options = ["Fjell", "Ski", "Kultur", "Bading", "Storby", "Historie", "Shopping", "Sol"];
  const handleSelect = (event) => {
    const value = event.target.value;
    if (!selectedOptions.includes(value)) {
      setSelectedOptions([...selectedOptions, value]);
    }
  };

  const removeOption = (optionToRemove) => {
    setSelectedOptions(selectedOptions.filter((option) => option !== optionToRemove));
  };

  useEffect(() => {
    if (!file) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const submit = async (event) => {
    event.preventDefault();
    const formdata = new FormData();

    //Formdata for å lage ny destninasjon
    formdata.append("destination_name", destination_name);
    formdata.append("destination_contry", destination_contry);
    formdata.append("destination_continent", destination_continent);
    formdata.append("destination_climate", destination_climate);
    formdata.append("ShortDescription", ShortDescription);
    formdata.append("longDescription", longDescription);
    formdata.append("author", destinationAuthor);
    for (var i = 0; i < selectedOptions.length; i++) {
      formdata.append("category", selectedOptions[i]);
    }
    formdata.append("file", file);
    axios
      .post("http://localhost:4000/newDestination", formdata)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setUploaded(true);
  };

  if (!uploaded) {
    return (
      <div class="main-container">
        <div class="container">
          <div class="signup-content">
            <div class="signup-form">
              <h2 class="form-title">Opprett ny destinasjon</h2>
              <img class="preview-picture" src={preview} alt="IMG goes here"></img>
              <div class="form-group">
                <div>
                  <form onSubmit={submit}>
                    <div class="form-group">
                      <label class="shortInputLabel" for="shortInput"></label>
                      <input
                        onChange={(e) => setDestinationName(e.target.value)}
                        type="text"
                        name="shortInput"
                        id="shortInput"
                        placeholder="Navn på destinasjonen"
                      ></input>
                    </div>

                    <div class="form-group">
                      <label class="shortInputLabel" for="shortInput"></label>
                      <input
                        onChange={(e) => setDestinationCountry(e.target.value)}
                        type="text"
                        name="shortInput"
                        id="shortInput"
                        placeholder="Land"
                      ></input>
                    </div>
                    <div class="form-group">
                      <label class="longDescriptionLabel" for="LongDescription"></label>
                      <textarea
                        onChange={(e) => setShortDescription(e.target.value)}
                        type="text"
                        name="LongDescription"
                        id="LongDescription"
                        placeholder="Kort beskrivelse"
                        maxLength={169}
                        rows={4}
                      ></textarea>
                    </div>
                    <div class="form-group">
                      <label class="longDescriptionLabel" for="LongDescription"></label>
                      <textarea
                        rows={8}
                        onChange={(e) => setLongDescription(e.target.value)}
                        type="text"
                        name="LongDescription"
                        id="LongDescription"
                        placeholder="Lang beskrivelse"
                      ></textarea>
                    </div>
                    <div class="form-group">
                      <select class="select" onChange={(e) => setDestinationContinent(e.target.value)}>
                        <option value="">Velg et kontinent</option>
                        <option value="Europa">Europa </option>
                        <option value="Nord-Amerika">Nord-Amerika </option>
                        <option value="Sør-Amerika">Sør-Amerika </option>
                        <option value="Asia">Asia</option>
                        <option value="Afrika">Afrika </option>
                        <option value="Oseania">Oseania</option>
                      </select>
                      <select class="select" onChange={(e) => setDestinationClimate(e.target.value)}>
                        <option value="">Velg et klima</option>
                        <option value="Varmt">Varmt </option>
                        <option value="Kaldt">Kaldt </option>
                        <option value="Temperert">Temperert </option>
                      </select>
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
                            <button class="form-button" onClick={() => removeOption(option)}>
                              x
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                    <div class="form-group">
                      <input
                        id="file"
                        filename={file}
                        onChange={(e) => setFile(e.target.files[0])}
                        type="file"
                        accept="image/*"
                      ></input>
                    </div>
                    <div class="form-group form-button">
                      <button
                        type="submit"
                        disabled={
                          !destination_name ||
                          !destination_contry ||
                          !file ||
                          !ShortDescription ||
                          destination_continent === ""
                        }
                      >
                        Legg til
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/"> </Navigate>;
  }
};

export default NewDestination;

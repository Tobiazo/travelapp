import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/NewDestination.css";
import { NavLink, json, Navigate } from "react-router-dom";

const NewDestination = () => {
  const [file, setFile] = useState(null);
  const [destination_name, setDestinationName] = useState("");
  const [destination_contry, setDestinationCountry] = useState("");
  const [ShortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const [preview, setPreview] = useState();

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
    formdata.append("ShortDescription", ShortDescription);
    formdata.append("longDescription", longDescription);

    formdata.append("file", file);
    axios
      .post("http://localhost:4000/upload", formdata)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  if (!uploaded) {
    return (
      <div class="main-container">
        <div class="container">
          <div class="signup-content">
            <div class="signup-form">
              <h2 class="form-title">Opprett ny destinasjon</h2>
              <img class="preview-picture" src={preview}></img>
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
                      <label class="shortInputLabel" for="shortInput"></label>
                      <input
                        onChange={(e) => setShortDescription(e.target.value)}
                        type="text"
                        name="shortInput"
                        id="shortInput"
                        placeholder="Kort beskrivelse"
                      ></input>
                    </div>
                    <div class="form-group">
                      <label
                        class="longDescriptionLabel"
                        for="LongDescription"
                      ></label>
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
                      <input
                        id="file"
                        filename={file}
                        onChange={(e) => setFile(e.target.files[0])}
                        type="file"
                        accept="image/*"
                      ></input>
                    </div>
                    <div class="form-group form-button">
                      <button type="submit" disabled={!file}>
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

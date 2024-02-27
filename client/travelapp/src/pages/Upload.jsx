import React, { useState } from "react";
import axios from "axios";
import "../styles/Login.css";

const UploadImage = () => {
  const [file, setFile] = useState(null);
  const [destination_name, setDestinationName] = useState("");
  const [destination_contry, setDestinationCountry] = useState("");
  const [ShortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");

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

  return (
    <div class="container">
      <div class="signup-content">
        <div class="signup-form">
          <h2 class="form-title">Upload image</h2>
          <div class="form-group">
            <div>
              <form onSubmit={submit}>
                <input
                  filename={file}
                  onChange={(e) => setFile(e.target.files[0])}
                  type="file"
                  accept="image/*"
                ></input>
                <input
                  onChange={(e) => setDestinationName(e.target.value)} //Foreløpig må man legge inn id på destinasjonen
                  type="text"
                  placeholder="Name of destination"
                ></input>
                <input
                  onChange={(e) => setDestinationCountry(e.target.value)} //Foreløpig må man legge inn id på destinasjonen
                  type="text"
                  placeholder="Country of destination"
                ></input>
                <input
                  onChange={(e) => setShortDescription(e.target.value)} //Foreløpig må man legge inn id på destinasjonen
                  type="text"
                  placeholder="Short description"
                ></input>
                <input
                  onChange={(e) => setLongDescription(e.target.value)} //Foreløpig må man legge inn id på destinasjonen
                  type="text"
                  placeholder="Long description"
                ></input>
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadImage;

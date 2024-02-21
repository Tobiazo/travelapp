import React, { useState } from "react";
import axios from "axios";
import "../styles/Login.css";

const UploadImage = () => {
  const [file, setFile] = useState(null);
  const [destinationID, setDestinationID] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    const formdata = new FormData();
    formdata.append("id", destinationID);
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
                  onChange={(e) => setDestinationID(e.target.value)} //Foreløpig må man legge inn id på destinasjonen
                  type="text"
                  placeholder="ID of destination"
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

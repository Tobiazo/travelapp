import React, { useState } from 'react';
import axios from 'axios';

const UploadImage = () => {
  const [file, setFile] = useState(null);
  const [destinationID, setDestinationID] = useState("")
  

  const submit = async event => {
    event.preventDefault()
    const formdata = new FormData()
    formdata.append('id', destinationID)
    formdata.append('file', file)
    axios.post('http://localhost:4000/upload', formdata)
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  return (
    <div>
      <form onSubmit={submit}>
        <input
          filename={file} 
          onChange={e => setFile(e.target.files[0])} 
          type="file" 
          accept="image/*"
        ></input>
        <input
          onChange={e => setDestinationID(e.target.value)} //Foreløpig må man legge inn id på destinasjonen
          type="text"
        ></input>
        <button type="submit">Submit</button>
      </form>
      
    </div>
  );
};

export default UploadImage;
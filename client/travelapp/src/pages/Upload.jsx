import React, { useState } from 'react';
import axios from 'axios';

const UploadImage = () => {
  const [file, setFile] = useState(null);
  const handleUpload = (e) => {
    const formdata = new FormData()
    formdata.append('file', file)
    axios.post('http://localhost:4000/upload', formdata) //api?
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  return (
    <div>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadImage;
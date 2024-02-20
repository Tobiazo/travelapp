const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const multer = require('multer'); // Import multer
const path = require('path')
// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Database connection
mongoose.connect(process.env.ATLAS_URI, {
});

mongoose.connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

//Henter routes filen
const userRoutes = require('./routes/routes')
app.use('/api', userRoutes);

//Fil-logikk for å laste opp
const storage = multer.diskStorage({
  destination: (req,res, cb) => {
    cb(null, 'public/Images')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originialname))
  }
})

const upload = multer({
  storage : storage
})

app.post('/upload', upload.single('file'),(req,res) => {
  console.log(req.file)
})


// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
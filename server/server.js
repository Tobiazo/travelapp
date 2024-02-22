const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const multer = require('multer'); // Import multer
const path = require('path')
const destinationModel = require('./models/destinationModel')
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
const userRoutes = require('./routes/routes');
app.use('/api', userRoutes);

//Fil-logikk for å laste opp
const storage = multer.diskStorage({
  destination: (req,res, cb) => {
    cb(null, 'public/Images')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() +path.extname(file.originalname))
  }
})

const upload = multer({
  storage : storage
})

app.post('/upload', upload.single('file'),async (req,res) => {
  console.log(req.body.id)
  console.log(req.file.filename)
  const updateDestination = await destinationModel.findByIdAndUpdate(req.body.id, {imgPath: req.file.filename})
})

app.use("/images", express.static("public/Images"));


// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
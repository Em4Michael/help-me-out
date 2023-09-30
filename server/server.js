const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const fs = require('fs');

const app = express();
const port = 3001;

// Connect to MongoDB (make sure MongoDB is running)
mongoose.connect('mongodb+srv://dbUser:dbUser@cluster0.2ryarbp.mongodb.net/help?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const recordingSchema = new mongoose.Schema({
  data: Buffer,
});

const Recording = mongoose.model('Recording', recordingSchema);

// Multer middleware for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('video'), async (req, res) => {
  try {
    const newRecording = new Recording({
      data: req.file.buffer,
    });

    await newRecording.save();

    // Delete the temporary file after saving to the database
    fs.unlinkSync(req.file.path);

    res.status(200).json({ message: 'Video uploaded and saved successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading video.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

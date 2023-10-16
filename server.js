const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up Multer for handling file uploads
const storage = multer.diskStorage({
  destination: 'public/uploads',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Define the route for image uploads
app.post('/upload', upload.single('image'), (req, res) => {
  if (req.file) {
    // Generate a permanent URL for the uploaded image
    const imageUrl = `/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl });
  } else {
    res.status(400).json({ error: 'Failed to upload image' });
  }
});

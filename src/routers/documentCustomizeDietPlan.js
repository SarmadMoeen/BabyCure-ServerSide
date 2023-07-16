const express = require('express');
const router = new express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up multer storage and file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir); // Set the destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    const filename = uniqueSuffix + extension; // Set the filename for uploaded files
    cb(null, filename);
  }
});

const upload = multer({ storage });

const DocumentCustomizeDietPlan = require('../models/documentCustomizeDietPlan');

// Handle post request to add a document for the CustomizeDietPlan
router.post("/postDocumentCustomizeDietPlan", upload.single('document'), async (req, res) => {
  try {
    const { cause } = req.body;
    const documentPath = req.file.path;

    console.log("Received Cause:", cause);
    console.log("Received Document Path:", documentPath);

    // Save the document path to MongoDB Compass
    const document = new DocumentCustomizeDietPlan({
      cause,
      document: documentPath
    });
    await document.save();

    res.status(200).send("Document saved successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;

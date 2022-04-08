// Initial setup
const express = require('express');
const app = express();
const path = require('path');
const router = require('./routes/router');

// Useful libraries
require('dotenv').config({
  silent: true, path: path.join(__dirname, '.env'),
}); // Stores custom environmental variables
const axios = require('axios'); // makes requests to API
const morgan = require('morgan'); // Logs incoming HTTP requests
const cors = require('cors'); // Enables CORS
// const multer = require('multer'); // Handles file uploads - currently unused
// const mongoose = require('mongoose'); // Database

// Middleware
app.use(express.static(path.join('..', 'public'))); // Serves static files
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({
  extended: true,
})); // Parses incoming request body
app.use(morgan('dev')); // Sets logging mode
app.use(cors()); // Enables CORS
app.use('/', router);

// Currently unused file uploading code
// const storage = multer.diskStorage({ // adding boilerplate base code
//   destination: function(req, file, cb) {
//     // store files into a directory named 'uploads'
//     cb(null, '/uploads');
//   },
//   filename: function(req, file, cb) {
//     // rename the files to include the current time and date
//     cb(null, file.fieldname + '-' + Date.now());
//   },
// });
// const upload = multer({storage: storage});

module.exports = app;

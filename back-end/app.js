// Initial setup
const express = require('express');
const app = express();
const path = require('path');

// Useful libraries
require('dotenv').config({ silent: true}); // loads environmental variables from hidden file
const axios = require('axios'); // makes requests to API
const morgan = require('morgan'); // handles HTTP POST requests with file uploads
const multer = require('multer'); // logs incoming HTTP requests

// Middleware
app.use(express.static(path.join(__dirname, 'public'))); // serves static files
app.use(express.json()); // parses incoming JSON requests
app.use(express.urlencoded({ extended: true})); // parses incoming requests with urlencoded payloads
app.use(morgan('dev'));
app.use((req, res, next) => {
    console.log("Example custom middleware function");
    next();
});

// Routes
app.get('/', (req, res) => {
    res.send('Example route');
});

module.exports = app;
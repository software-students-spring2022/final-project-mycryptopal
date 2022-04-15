/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
// Initial setup
const express = require('express');
const app = express();
const path = require('path');

// Constants
const PUBLIC_DIR = path.join(__dirname, `../public`);
const router = require('./routes/router');
const faqs = require('./data/faqs.json');

// Stores custom environmental variables
require('dotenv').config({
  silent: true, path: path.join(__dirname, '.env'),
});
const morgan = require('morgan'); // Logs incoming HTTP requests
const cors = require('cors'); // Enables CORS
// Handles file uploads
const aws = require('aws-sdk');

const s3 = new aws.S3();
s3.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION
})
const multer = require('multer');
const multerS3 = require('multer-s3');
const s3Storage = multerS3({
  s3: s3,
  acl: 'public-read',
  bucket: process.env.AWS_S3_BUCKET,
  key: function(req, file, cb) {
    console.log(file);
    const newName = `u/${req.body.userId}/${file.fieldname}${path.extname(file.originalname)}`;
    cb(null, newName);
  }
});
const upload = multer({storage: s3Storage});
// Database integration
const mongoose = require('mongoose');
// Connects to database
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@cluster0.wux8g.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`)
    .then( () => {
      console.log('Connected to database ');
    })
    .catch( (err) => {
      console.error(`Error connecting to the database. \n${err}`);
    });

// Middleware
app.use('/static', express.static(PUBLIC_DIR)); // Serves static files

app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({
  extended: true,
})); // Parses incoming request body
app.use(morgan('dev')); // Sets logging mode
app.use(cors()); // Enables CORS
app.use('/', router);

// Placeholder/not important yet
app.get('/faqs', (req, res) => {
  res.send(faqs);
});

app.post('/contact', (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});

app.post('/register', (req, res) => {
  console.log(req.body);
  res.redirect(`${process.env.FRONT_END_URL}/login`);
});

app.post('/personalize', (req, res) => {
  console.log(req.body);
  res.redirect(`${process.env.FRONT_END_URL}/settings`);
});

app.post('/security', (req, res) => {
  console.log(req.body);
  res.redirect(`${process.env.FRONT_END_URL}/settings`);
});

app.get('/avatar/:userId', (req, res) => {
  res.json({'url': `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/u/${req.params.userId}/avatar.png`}); // extension shouldn't be hardcoded but this is just placeholder code until MongoDB has been implemented
});

app.post('/avatar', upload.single('avatar'), (req, res) => {
  res.json({});
});

module.exports = app;

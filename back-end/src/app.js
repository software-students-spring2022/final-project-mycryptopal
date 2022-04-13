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
const multer = require('multer'); 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PUBLIC_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${req.body.userId}${path.extname(file.originalname)}`);
  },
});
const upload = multer({storage: storage});
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
// Imports models
const User = require('./models/User');

// Authentication
const jwt = require("jsonwebtoken")
const passport = require("passport")
const bcrypt = require('bcrypt');

app.use(passport.initialize());
const { jwtOptions, jwtStrategy } = require("./jwt-config.js")
passport.use(jwtStrategy);

// Middleware
app.use('/static', express.static(PUBLIC_DIR)); // Serves static files
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({
  extended: true,
})); // Parses incoming request body
app.use(morgan('dev')); // Sets logging mode
app.use(cors()); // Enables CORS
app.use('/', router);

app.get('/protected', passport.authenticate('jwt', { session: false}), (req, res) => {
  res.send(200);
})

app.post('/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await User.findOne({username: username});

  if(!user) {
    res
    .status(401)
    .json({success: false, message: `user not found ${username}.`});
  }

  else{
    const passwordsMatch = await bcrypt.compare(password, user.password);
    if(passwordsMatch) {
      const payload = {user_id: user.user_id};
      const token = jwt.sign(payload, jwtOptions.secretOrKey);
      res.json({ success: true, username: user.username, token: token });
    } else {
      res.status(401).json({ success: false, message: "passwords did not match" })
    }
  }
});

// Placeholder/not important yet
app.get('/faqs', (req, res) => {
  res.send(faqs);
});

app.post('/contact', (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});

app.post('/login', (req, res) => {
  console.log(req.body);
  res.redirect(`${process.env.FRONT_END_URL}`);
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
  res.json({'url': `avatar-${req.params.userId}.jpg`}); // extension shouldn't be hardcoded but this is just placeholder code until MongoDB has been implemented
});

app.post('/avatar', upload.single('avatar'), (req, res) => {
  res.json({});
});

module.exports = app;



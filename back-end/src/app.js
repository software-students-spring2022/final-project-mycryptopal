/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
// Initial setup
const express = require('express');
const app = express();
const path = require('path');
const router = require('./routes/router');
const faqs = require('./data/faqs.json');

// Useful libraries
const fs = require('fs');
require('dotenv').config({
  silent: true, path: path.join(__dirname, '.env'),
}); // Stores custom environmental variables
const morgan = require('morgan'); // Logs incoming HTTP requests
const cors = require('cors'); // Enables CORS
const multer = require('multer'); // Handles file uploads
const PUBLIC_DIR = path.join(__dirname, `../public`);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PUBLIC_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${req.body.userId}${path.extname(file.originalname)}`);
  },
});
const upload = multer({storage: storage});

const mongoose = require('mongoose'); // Database
const {constants} = require('crypto');

// Auth
const jwt = require("jsonwebtoken")
const passport = require("passport")
const bcrypt = require('bcrypt');

const users = require("./user_data.js")

app.use(passport.initialize()) 
const { jwtOptions, jwtStrategy } = require("./jwt-config.js") // import setup options for using JWT in passport
passport.use(jwtStrategy)


const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  username: String,
  password: String,
  crypto: Array,
  comments: Array,
});
const User = mongoose.model('User', UserSchema);


// Middleware
app.use('/static', express.static(PUBLIC_DIR)); // Serves static files
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({
  extended: true,
})); // Parses incoming request body
app.use(morgan('dev')); // Sets logging mode
app.use(cors()); // Enables CORS
app.use('/', router);

app.get('/faqs', (req, res) => {
  res.send(faqs);
}),

app.post('/contact', (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});


app.post('/register', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  console.log(username, password, email);

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  const newUser = new User({
    username: username,
    password: hashed,
    email: email
  });

  try {
    let saved = await newUser.save();
    console.log(saved);
    console.log('saved');
  }
  catch(err) {
    console.log(err);
  }



});

app.post("/login", async function (req, res) {
  // brab the name and password that were submitted as POST body data
  const username = req.body.username
  const password = req.body.password
  console.log(`${username}, ${password}`)

  // usually this would be a database call, but here we look for a matching user in our mock data
  const user = await User.findOne({username: username});
  if (!user) {
    // no user found with this name... send an error
    res
      .status(401)
      .json({ success: false, message: `user not found: ${username}.` })
  }
  else{
    const validPassword = await bcrypt.compare(password, user.password);
    if(validPassword){
      const payload = { id: user.id } // some data we'll encode into the token
      const token = jwt.sign(payload, jwtOptions.secretOrKey) // create a signed token
      res.json({ success: true, username: user.username, token: token }) // send the token to the client to store  
    }
    else {
      res.status(401).json({ success: false, message: "passwords did not match" })
    }
  }
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

// added mongoDB connection code.
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@cluster0.wux8g.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`)
    .then( () => {
      console.log('Connected to database ');
    })
    .catch( (err) => {
      console.error(`Error connecting to the database. \n${err}`);
    });

module.exports = app;



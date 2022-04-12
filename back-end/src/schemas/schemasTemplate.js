/* eslint no-unused-vars: "off" */

const mongoose = require('mongoose');

// const password = 'ivt4SmlFqu8avauz';

// const url = `mongodb+srv://Shanks480Agile:${password}@cluster0.wux8g.mongodb.net/myCryptoPal?retryWrites=true&w=majority
// `;

// // connecting to database
// mongoose.connect(url)
//     .then( () => {
//       console.log('Connected to database ');
//     })
//     .catch( (err) => {
//       console.error(`Error connecting to the database. \n${err}`);
//     });

// Current Schema diagrams for User and ContactPage
const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  username: String,
  password: String,
  crypto: Array,
  comments: Array,
});

const ContactSchema = new mongoose.Schema({
  username: String,
  feedback: String,
});

// Mongoose model function makes the Schemas into JSON-like objects
// that can be initialized as containers
const User = mongoose.model('User', UserSchema);
const Contact = mongoose.model('Contact', ContactSchema);


// Creates Object like users to be posted to the database
const user1 = new User({
  firstName: 'test',
  lastName: 'user',
  email: 'testUser123@gmail.com',
  username: 'testUser123123',
  password: 'testPassword12',
});

const user2 = new User({
  firstName: 'test2',
  lastName: 'user2',
  email: 'testUser1233@gmail.com',
  username: 'testUser1231123',
  password: 'testPassword1132',
});

const user3 = new User({
  firstName: 'test21212',
  lastName: 'user2134134',
  email: 'testUser1231343143@gmail.com',
  username: 'testUser1781123',
  password: 'testPassword156762',
});

const contact1 = new Contact({
  username: 'Shashanka',
  feedback: 'Great App!',
});


// the save() is essentially posting to the database, similar to SQL "INSERT"
// user1.save(function(err, user) {
//   if (err) return console.error(err);
//   console.log(user1.username + ' saved to atlas');
// });
// user2.save(function(err, user) {
//   if (err) return console.error(err);
//   console.log(user2.username + ' saved to atlas');
// });
// user3.save(function(err, user) {
//   if (err) return console.error(err);
//   console.log(user3.username + ' saved to atlas');
// });

contact1.save(function(err, contacts) {
  if (err) return console.error(err);
  console.log(contact1.username + ' saved to atlas');
});

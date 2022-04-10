
const { use } = require('chai');
const mongoose = require('mongoose')

const password = 'ivt4SmlFqu8avauz'

const url = `mongodb+srv://Shanks480Agile:${password}@cluster0.wux8g.mongodb.net/myCryptoPal?retryWrites=true&w=majority
`;

mongoose.connect(url)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })


const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String, 
    username: String,
    password: String,
    crypto: Array
})
















/* eslint-disable no-unused-vars */
const {Router} = require('express');
const router = new Router({mergeParams: true});
const axios = require('axios');
const path = require('path');
require('dotenv').config({
  silent: true, path: path.join(__dirname, '../..', '.env'),
}); // Stores custom environmental variables

router.get('/assets', (req, res) => {
  const COINS = ['BTC', 'ETH', 'DOGE', 'SOL', 'XMR'];
  const FRACTIONS = new Array(COINS.length).fill(0).map(() => {
    return parseInt((Math.random() * 200)) + 20;
  });
  const ALLOCATIONS = COINS.reduce((current, element, index) => {
    current[element] = FRACTIONS[index];
    return current;
  }, {});
  res.json(ALLOCATIONS);
});

router.get('/data', (req, res) => {
  // axios
  //     .get(`https://my.api.mockaroo.com/users.json?key=4c156a80&limit=1`)
  //     .then((apiResponse) => res.json(apiResponse.data))
  //     .catch(err => console.log(err));
  const obj = {
    id: 1181923123812,
    firstName: 'John',
    lastName: 'Smith',
    username: 'jsmith',
    email: 'jsmith123@mail.com',
  };
  res.json(obj);
});

router.post('/contact', (req, res) => {
  console.log(req.body);
  res.redirect('http://localhost:3000/contact');
});

module.exports = router;

// Initial setup
const express = require('express');
const app = express();
const path = require('path');

// Useful libraries
require('dotenv').config({ silent: true}); // loads environmental variables from hidden file
const axios = require('axios'); // makes requests to API
const morgan = require('morgan'); // handles HTTP POST requests with file uploads
const multer = require('multer'); // logs incoming HTTP requests
const cors = require('cors');

// Middleware
app.use(express.static(path.join(__dirname, 'public'))); // serves static files
app.use(express.json()); // parses incoming JSON requests
app.use(express.urlencoded({ extended: true})); // parses incoming requests with urlencoded payloads
app.use(morgan('dev'));
app.use(cors());
app.use((req, res, next) => {
    console.log("Example custom middleware function");
    next();
});
// Routes
app.get('/', (req, res) => {    //dont need this route, just commmenting it for now, going to switch it to /Home route
    res.send('Example route');
});

app.get('/news', (req, res, next) => {
    const API_KEY_NEWS = "0473a42ea4ee4b1fa9734aea4ab7d84d"
    const API_URL_NEWS = "https://newsapi.org/v2/everything"
    const PAGE_SIZE = "20"
    let search_term = "cryptocurrency"

  axios
  .get(`${API_URL_NEWS}?q=${search_term}&apiKey=${API_KEY_NEWS}&pageSize=${PAGE_SIZE}`)
  .then(apiResponse => res.json(apiResponse.data))
  .catch(err => next(err));
});

app.get('/userdata', (req, res) => {
  axios
  .get(`https://my.api.mockaroo.com/users.json?key=4c156a80&limit=1`)
  .then(apiResponse => res.json(apiResponse.data))
  .catch(err=> next(err));
});

app.get('/crypto/:symbol', (req, res) => {
  axios
  .get(`https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=${req.params.symbol}`, { headers: { 'X-CMC_PRO_API_KEY': '528926c7-6726-45a1-9add-dcb670893b40' }})
  .then(apiResponse => res.json(apiResponse.data))
  .catch(err => console.log(err))
});

app.get('/crypto/info/:symbol', (req, res) => {
  axios
  .get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?symbol=${req.params.symbol}`, { headers: { 'X-CMC_PRO_API_KEY': '22311edd-3d82-441f-b577-f54ae7faa7f7' }})
  .then(apiResponse => res.json(apiResponse.data))
  .catch(err => console.log(err))
});

app.get('/graph/:symbol/:interval?', (req, res) => {
  const API_TOKEN = "c8qd4eiad3ienapjjc9g";
  const API_URL = "https://finnhub.io/api/v1/crypto/candle"
  const symbol = req.params.symbol;
  let querySymbol = 'BINANCE:'
  let queryInterval = req.params.interval;

  if (symbol === 'USDT') {
    querySymbol += 'BUSDUSDT';
  }
  else {
    querySymbol += `${symbol.toUpperCase()}USDT`;
  }

  if (!queryInterval) {
    queryInterval = 30;
  }
  else {
    queryInterval = parseInt(queryInterval);
  }

  function getUnixTime(date) {
      return date.getTime() / 1000 | 0;
  }

  function to() {
    return getUnixTime(new Date());
  }
  
  function from() {
    let d = new Date();
    d.setDate(d.getDate() - queryInterval); //this will be modified to whatver is passed from front end
    return getUnixTime(d);
  }

  axios
  .get(`${API_URL}?from=${from()}&resolution=D&symbol=${querySymbol}&to=${to()}&token=${API_TOKEN}`)
  .then(apiResponse => res.json(apiResponse.data))
  .catch(err => console.log(err));
});

app.get('/assets', (req, res) => {
  const COINS = ['BTC', 'ETH', 'DOGE', 'SOL'];
  const FRACTIONS = new Array(4).fill(0).map(() => parseInt((Math.random() * 200)) + 20);
  const ALLOCATIONS = COINS.reduce((current, element, index) => {
    current[element] = FRACTIONS[index];
    return current;
  }, {});
  res.json(ALLOCATIONS);
});

module.exports = app;
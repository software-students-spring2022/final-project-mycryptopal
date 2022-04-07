// Initial setup
const express = require('express');
const app = express();
const path = require('path');

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
app.use(express.static(path.join(__dirname, 'public'))); // Serves static files
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({
  extended: true,
})); // Parses incoming request body
app.use(morgan('dev')); // Sets logging mode
app.use(cors()); // Enables CORS

// Routes
app.get('/api/news', (req, res) => {
  const SEARCH_TERM = 'cryptocurrency';
  const SORT_BY = 'publishedAt';
  const LANGUAGE = 'en';
  const PAGE_SIZE = Math.min(parseInt(req.query.limit), 100);
  axios
      .get(
          `${process.env.NEWS_API_URL}?apiKey=${process.env.NEWS_API_KEY}` +
          `&q=${SEARCH_TERM}` +
          `&language=${LANGUAGE}` +
          `&sortBy=${SORT_BY}` +
          `&pageSize=${PAGE_SIZE}`
      )
      .then((apiResponse) => res.json(apiResponse.data))
      .catch((err) => console.log(err));
});

app.get('/api/explore', (req, res) => {
  const LIMIT = Math.max(parseInt(req.query.limit), 102);
  axios
      .get(
          `${process.env.CMC_API_URL_V1}/listings/latest?limit=${LIMIT}`,
          {
            headers: {
              'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY,
            },
          }
      )
      .then((apiResponse) => {
        const data = apiResponse.data.data;
        const coins = data.reduce((resultArray, currentElement) => {
          const coin = {};
          coin.name = currentElement.name;
          coin.symbol = currentElement.symbol;
          coin.pic = `${process.env.CMC_ICON_URL}/${currentElement.id}.png`;
          coin.url = `/crypto/${currentElement.symbol}`;
          resultArray.push(coin);
          return resultArray;
        }, []);
        res.json(coins);
      })
      .catch((err) => console.log(err));
});

app.get('/api/crypto/data/:symbol', (req, res) => {
  const SYMBOL = req.params.symbol.toUpperCase();
  axios
      .get(
          `${process.env.CMC_API_URL_V2}/quotes/latest?symbol=${SYMBOL}`,
          {
            headers:
            {
              'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY,
            },
          }
      )
      .then((apiResponse) => res.json(apiResponse.data.data[`${SYMBOL}`][0]))
      .catch((err) => {
        res.status(404);
        res.json({});
      });
});

app.get('/api/crypto/info/:symbol', (req, res) => {
  const SYMBOL = req.params.symbol.toUpperCase();
  axios
      .get(
          `${process.env.CMC_API_URL_V1}/info?symbol=${SYMBOL}`,
          {
            headers:
            {
              'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY_2,
            },
          }
      )
      .then((apiResponse) => {
        const data = apiResponse.data.data;
        res.json(data[`${SYMBOL}`]);
      })
      .catch((err) => {
        res.status(404);
        res.json({});
      });
});

app.get('/api/crypto/graph/:symbol', (req, res) => {
  // Helper function for data transformation
  function transformData(data) {
    return data.c.map((item, index) => ({
      close: Number(item).toFixed(5),
      open: Number(data.o[index]).toFixed(5),
      timestamp: new Date(data.t[index] * 1000).toLocaleDateString(),
    }));
  }

  // Helper functions for time
  function getUnixTime(date) {
    return date.getTime() / 1000 | 0;
  }
  function from(queryInterval) {
    const d = new Date();
    d.setDate(d.getDate() - queryInterval);
    return getUnixTime(d);
  }
  function to() {
    return getUnixTime(new Date());
  }

  // Query constants
  const RESOLUTION = 'D';
  const SYMBOL = req.params.symbol.toUpperCase();
  const EXCHANGE_PREFIX = 'BINANCE:';
  let querySymbol = EXCHANGE_PREFIX;
  let queryInterval = parseInt(req.query.interval);

  // Validate query parameters
  if (SYMBOL === 'USDT') {
    querySymbol += 'BUSDUSDT';
  } else {
    querySymbol += `${SYMBOL}USDT`;
  }
  if (!queryInterval || [30, 60, 90, 120].indexOf(queryInterval) < 0) {
    queryInterval = 30;
  }

  // API request
  axios
      .get(
          `${process.env.FINNHUB_API_URL}/candle?from=${from(queryInterval)}` +
          `&to=${to()}` +
          `&resolution=${RESOLUTION}` +
          `&symbol=${querySymbol}` +
          `&token=${process.env.FINNHUB_API_KEY}`
      )
      .then((apiResponse) => {
        res.json(transformData(apiResponse.data));
      })
      .catch((err) => console.log(err));
});

// Database requests - currently mock data
app.get('/user/assets', (req, res) => {
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

app.get('/user/data', (req, res) => {
  axios
      .get(`https://my.api.mockaroo.com/users.json?key=4c156a80&limit=1`)
      .then((apiResponse) => res.json(apiResponse.data))
      .catch((err)=> console.log(err));
});


app.get('/lesson/:lessonid', (req, res) => {
// we are working on adding lesson routes, need to separate app.get calls
// into their own files first.
// this will tomorrow morning contain an import into lessons.js
// import lessons from ./Lessons/Lessons

});

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

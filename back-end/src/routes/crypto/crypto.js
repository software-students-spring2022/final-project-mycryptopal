const {Router} = require('express');
const router = new Router({mergeParams: true});
const axios = require('axios');
const path = require('path');
const {from, to, transformData} = require('../../lib');
require('dotenv').config({
  silent: true, path: path.join('../..', '.env'),
}); // Stores custom environmental variables

router.get('/crypto/data/:symbol', (req, res) => {
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

router.get('/crypto/info/:symbol', (req, res) => {
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

router.get('/crypto/explore', (req, res) => {
  const PAGE_SIZE = parseInt(req.query.limit);
  const LIMIT = PAGE_SIZE ? PAGE_SIZE : 20;
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
      .catch((err) => {
        res.status(400);
        res.json({articles: []});
      });
});

router.get('/crypto/graph/:symbol', (req, res) => {
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

module.exports = router;

/* eslint-disable max-len */
const {Router} = require('express');
const router = new Router({mergeParams: true});
const axios = require('axios');
const path = require('path');
const {from, to, transformData, getDataMax, getDataMin} = require('../../lib');
require('dotenv').config({
  silent: true, path: path.join(__dirname, '../..', '.env'),
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
          },
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
          },
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
          },
      )
      .then((apiResponse) => {
        const data = apiResponse.data.data;
        const coins = data.reduce((resultArray, currentElement) => {
          const coinInfo = {};
          coinInfo.label = currentElement.name;
          coinInfo.symbol = currentElement.symbol;
          coinInfo.pic = `${process.env.CMC_ICON_URL}/${currentElement.id}.png`;
          coinInfo.supply = currentElement['circulating_supply'];
          coinInfo.volume = currentElement.quote.USD['volume_24h'];
          coinInfo.cap = currentElement.quote.USD['market_cap'];
          resultArray.push(coinInfo);
          return resultArray;
        }, []);
        res.json(coins);
      })
      .catch((err) => {
        res.status(400);
        res.json({});
      });
});

router.get('/crypto/graph/:symbol', (req, res) => {
  const QUERY_INTERVAL = `1d`;
  const querySymbol = req.params.symbol;
  const queryInterval = parseInt(req.query.interval);

  axios
      .get(`${process.env.MESSARI_API_URL}/${querySymbol}/metrics/price/time-series` +
            `?start=${from(queryInterval)}` +
            `&end=${to}` +
            `&interval=${QUERY_INTERVAL}`,
      {
        headers: {
          'x-messari-api-key': process.env.MESSARI_API_KEY,
        },
      })
      .then((apiResponse) => {
        const tickers = apiResponse.data.data.values;
        const roundedTickers = transformData(tickers);
        const graphData = {
          values: roundedTickers,
          min: getDataMin(tickers),
          max: getDataMax(tickers),
        };
        res.json(graphData);
      })
      .catch((err) => console.log(err));
});

module.exports = router;

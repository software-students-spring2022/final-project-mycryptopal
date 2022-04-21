/* eslint-disable max-len */
const {Router} = require('express');
const router = new Router({mergeParams: true});
const axios = require('axios');
const path = require('path');
const {from, to, transformData, getDataMax, getDataMin} = require('../../lib');
require('dotenv').config({
  silent: true, path: path.join(__dirname, '../..', '.env'),
}); // Stores custom environmental variables

const CMC_HEADER = {'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY};
const MESSARI_HEADER = {'x-messari-api-key': process.env.MESSARI_API_KEY};

router.get('/crypto/data/:symbol', async (req, res) => {
  const SYMBOL = req.params.symbol.toUpperCase();
  try {
    const apiResponse = await axios.get(`${process.env.CMC_API_URL_V2}/quotes/latest?symbol=${SYMBOL}`, {headers: CMC_HEADER});
    const data = apiResponse.data.data[SYMBOL][0];
    res.json({success: true, cryptoData: data});
  } catch (err) {
    const errorResponse = err.response.data.status;
    console.log('Error - CMC API');
    console.log(errorResponse);
    res.status(errorResponse.error_code).json({success: false, error: errorResponse.error_message});
  }
});

router.get('/crypto/info/:symbol', async (req, res) => {
  const SYMBOL = req.params.symbol.toUpperCase();
  try {
    const apiResponse = await axios.get(`${process.env.CMC_API_URL_V1}/info?symbol=${SYMBOL}`, {headers: CMC_HEADER});
    const data = apiResponse.data.data[SYMBOL];
    res.json({success: true, cryptoInfo: data});
  } catch (err) {
    const errorResponse = err.response.data.status;
    console.log('Error - CMC API');
    console.log(errorResponse);
    res.status(errorResponse.error_code).json({success: false, error: errorResponse.error_message});
  }
});

router.get('/crypto/explore', async (req, res) => {
  const LIMIT = parseInt(req.query.limit);
  if (!LIMIT) {
    res.status(400).json({success: false, error: 'Invalid limit specified'});
  } else {
    try {
      const apiResponse = await axios.get(`${process.env.CMC_API_URL_V1}/listings/latest?limit=${LIMIT}`, {headers: CMC_HEADER});
      const data = apiResponse.data.data;
      const cryptos = data.reduce((resultArray, currentElement) => {
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
      res.json({success: true, cryptos: cryptos});
    } catch (err) {
      const errorResponse = err.response.data.status;
      console.log('Error - CMC API');
      console.log(errorResponse);
      res.status(errorResponse.error_code).json({success: false, error: errorResponse.error_message});
    }
  }
});

router.get('/crypto/graph/:symbol', async (req, res) => {
  const SYMBOL = req.params.symbol.toUpperCase();
  const queryInterval = parseInt(req.query.interval);
  try {
    const apiResponse = await axios.get(`${process.env.MESSARI_API_URL}/${SYMBOL}/metrics/price/time-series` +
                                `?start=${from(queryInterval)}` +
                                `&end=${to}` +
                                `&interval=1d`,
    {headers: MESSARI_HEADER});
    const tickers = apiResponse.data.data.values;
    const roundedTickers = transformData(tickers);
    const graphData = {
      values: roundedTickers,
      min: getDataMin(tickers),
      max: getDataMax(tickers),
    };
    res.json({success: true, graphData: graphData});
  } catch (err) {
    const errorResponse = err.response.data.status;
    console.log('Error - Messari API');
    console.log(errorResponse);
    res.status(errorResponse.error_code).json({success: false, error: errorResponse.error_message});
  }
});

module.exports = router;

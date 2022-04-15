/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const cryptoSchema = new mongoose.Schema({
  id: SVGAnimatedInteger,
  name: String,
  price: Number,
  symbol: String,
  percentChange: Number,
  imageUrl: String,
  tradingVolume: Number,
  marketCap: Number,
  circulatingSupply: Number,
  priceTickers: Object,
  description: String,

});

const Crypto = mongoose.model('Crypto', schema);

module.exports = Crypto;

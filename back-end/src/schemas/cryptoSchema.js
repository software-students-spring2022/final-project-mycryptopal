const mongoose = require('mongoose');
const cryptoSchema = new mongoose.Schema({
    id: SVGAnimatedInteger;
    name: String;
    price: Number;
    symbol: String;
    percentChange: Number;
    imageUrl: String;
    tradingVolume: Number;
    marketCap: Number;
    circulatingSupply: Number;
    priceTickers: Object;
    description: String;

});

const Crypto = db.model('Crypto', schema);

module.exports = Crypto;
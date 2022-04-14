const mongoose = require('mongoose');
const cryptoSchema = new mongoose.Schema({
    id: SVGAnimatedInteger;
    name: String;
    price: Double;
    symbol: String;
    percentChange: Double;
    imageUrl: String;
    tradingVolume: Double;
    marketCap: Double;
    circulatingSupply: Double;
    priceTickers: Object;
    description: String;

});

const Crypto = db.model('Crypto', schema);

module.exports = Crypto;
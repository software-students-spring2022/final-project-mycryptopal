import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import './Crypto.css';
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
} from 'recharts';
import Typography from '@mui/material/Typography';

function Crypto() {
  const [coinData, setCoinData] = useState({slug: '', symbol: '', circulating_supply: 0, quote: {USD: {price: 0, percent_change_24h: 0, volume_24h: 0, market_cap: 0}}});
  const [coinGraph, setCoinGraph] = useState(null);
  const [coinInfo, setCoinInfo] = useState('');
  const [coinLogo, setCoinLogo] = useState(`${process.env.REACT_APP_COIN_PLACEHOLDER}`);

  const {symbol} = useParams();

  useEffect(() => {
    async function getCoinData() {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/crypto/data/${symbol}`);
      if (res.status === 404) {
        window.location.href = '/notfound';
      }
      const data = await res.json();
      setCoinData(data);
    }
    getCoinData();
  }, [symbol]);

  useEffect(() => {
    async function getCoinGraph() {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/crypto/graph/${symbol}`);
      const data = await res.json();
      setCoinGraph(data);
    }
    async function getCoinInfo() {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/crypto/info/${symbol}`);
      const data = await res.json();
      setCoinInfo(data.description);
    }
    getCoinGraph();
    getCoinInfo();
    if (coinData.id) {
      const logoURL = `${process.env.REACT_APP_COIN_LOGO}/${coinData.id}.png`;
      setCoinLogo(logoURL);
    }
  }, [coinData]);

  return (
    <>
      <div id="page-title">
        <Typography variant='h4' fontWeight={'bold'}>Analytics</Typography>
      </div>

      <div id="page-content">
        <div id="top-content">
          <div id="crypto-info">
            <div id="crypto-name">
              {coinData.name}
            </div>
            <div id="crypto-subinfo">
              <div className="subinfo info-left">
                <div className="cryptoInfo cryptoPrice">Price</div>
                <div className="cryptoInfo cryptoPercent">% Change</div>
              </div>
              <div className="subinfo info-right">
                <div className="cryptoInfo cryptoPrice">{coinData.quote.USD.price.toFixed(2)}</div>
                <div className="cryptoInfo cryptoPercent">{(coinData.quote.USD.percent_change_24h / 100).toFixed(2)}%</div>
              </div>
            </div>
          </div>
          <div id="crypto-image">
            <img src={coinLogo} alt="coin pic"></img>
          </div>
        </div>

        <div id="middle-content">
          <div id="stock-graph">
            <div className="sectionHeader">
                            Price History (30 Days)
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={coinGraph}
                margin={{top: 20, bottom: 15}}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis type="number" allowDecimals={true}
                  allowDataOverflow={true} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="open" stroke="blue" dot={false} />
                <Line type="monotone" dataKey="close" stroke="gray" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div id="crypto-history">
            <div className="sectionHeader">
                            Cryptocurrency Information and History
            </div>
            <div id="history-content">
              {coinInfo}
            </div>
          </div>
        </div>

        <div id="bottom-content">
          <div className="sectionHeader">
                        Market Stats
          </div>
          <div id="market-info">
            <div className="subinfo info-left">
              <div className="cryptoInfo cryptoVolume">Trading Volume</div>
              <div className="cryptoInfo cryptoCap">Market Cap</div>
              <div className="cryptoInfo cryptoSupply">Circulating Supply</div>
            </div>
            <div className="subinfo info-right">
              <div className="cryptoInfo cryptoVolume">{coinData.quote.USD.volume_24h.toFixed()}</div>
              <div className="cryptoInfo cryptoCap">{coinData.quote.USD.market_cap.toFixed()}</div>
              <div className="cryptoInfo cryptoSupply">{coinData.circulating_supply.toFixed()}</div>
            </div>
          </div>
        </div>
        <div id="buttons">
          <div id="button-left">
            <input id="addButton" onClick = {addCrypto} type = "button" value = "Add Crypto" className = "add_crypto_button"></input>
          </div>
          <div id="button-right">
            <input id = "dropButton" onClick = {dropCrypto} type = "button" value = "Drop Crypto" className = "drop_crypto_button"></input>
          </div>
        </div>
      </div>
    </>
  );
}

function addCrypto() {
  // fetch cry name from mockaroo
  alert('You have successfully added a crypto to your watchlist!');
}

function dropCrypto() {
  // fetch crypto name from mockaroo
  alert('You have successfully removed a crypto from your watchlist.');
}
export default Crypto;

import './Portfolio.css';
import React, { useState, useEffect, useMemo } from "react";
import queryString from "query-string";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer
 
} from "recharts";

const API_TOKEN = "c8qd4eiad3ienapjjc9g";
const CRYPTO_SYMBOLS = ["BINANCE:BTCUSDT", "BINANCE:ETHUSDT", "BINANCE:DOGEUSDT", "SOL", "BINANCE:SHIBUSDT"]
const INTERVAL_OPTIONS = [30, 60, 90, 120]
const API_URL = "https://finnhub.io/api/v1/crypto/candle"
const RESOLUTION = "D"


function getUnixTime(date) {
    return date.getTime() / 1000 | 0;
  }
  
  function transformData(data) {
    return data.c.map((item, index) => ({
      close: Number(item).toFixed(2),
      open: Number(data.o[index]).toFixed(2),
      timestamp: new Date(data.t[index] * 1000).toLocaleDateString()
    }))
  }


  function Portfolio() {
    const [symbol, setSymbol] = useState(CRYPTO_SYMBOLS[0])
    const [data, setData] = useState(null);
    const [interval, setInterval] = useState(INTERVAL_OPTIONS[0]);
  
    const to = useMemo(() => {
      return getUnixTime(new Date());
    }, []);
    const from = useMemo(() => {
      let d = new Date();
      d.setDate(d.getDate() - interval);
  
      return getUnixTime(d);
    }, [interval])
  
    useEffect(() => {
      if (!from || !to || !symbol) {
        return;
      }
  
      const query = {
        token: API_TOKEN,
        resolution: RESOLUTION,
        from,
        to,
        symbol
      };
  
      fetch(`${API_URL}?${queryString.stringify(query)}`)
        .then(async data => setData(transformData(await data.json())))
        .catch(error => console.error(error))
  
    }, [from, to, symbol]);
  
const handleChangeCrypto = event =>
      setSymbol(event.target.value);
  
const handleChangeInterval = event =>
      setInterval(event.target.value);
  
return (
    <>
      <div id="page-title">
        <h1>My Portfolio</h1>
      </div>
      <div id="page-content">
        <div className="container">
            <div className="selector">
            <label for="stock_select" className="label">
                <strong>Stock Symbol: </strong>
            </label>
            <select id="stock_select" onChange={handleChangeCrypto}>
                {CRYPTO_SYMBOLS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            </div>
            <div className="selector">
            <label for="interval_select" className="label">
                <strong>Interval: </strong>
            </label>
            <select onChange={handleChangeInterval}>
                {INTERVAL_OPTIONS.map(s => <option key={s} value={s}>Past {s} days</option>)}
            </select>
            </div>
        </div>
        <div className="container">
        <ResponsiveContainer width="100%" height={300}> 
            <LineChart width={450} height={300} data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
      </div>   
    </>
);

            }

export default Portfolio;
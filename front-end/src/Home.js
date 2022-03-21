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
  PieChart,
  Pie,
  Cell
} from "recharts";
import './Home.css';

const API_TOKEN = "c8qd4eiad3ienapjjc9g";
const CRYPTO_SYMBOLS = ["BTC", "ETH", "DOGE", "SOL", "SHIB"]
const INTERVAL_OPTIONS = [30, 60, 90, 120]
const API_URL = "https://finnhub.io/api/v1/crypto/candle"
const API_URL_SYMBOL = "https://finnhub.io/api/v1/crypto/symbol"
const RESOLUTION = "D"
const COLORS = ["blue", "green", "yellow", "coral"]

const allocation = [
  {
    name: "BTC",
    value: 0.35,
  },
  {
    name: "ETH",
    value: 0.2,
  },
  {
    name: "DOGE",
    value: 0.2,
  },
  {
    name: "SOL",
    value: 0.25
  }
];

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



function Home() {
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
        <div>
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
                <strong>Time Interval: </strong>
              </label>
              <select onChange={handleChangeInterval}>
                {INTERVAL_OPTIONS.map(s => <option key={s} value={s}>Past {s} days</option>)}
              </select>
            </div>
          </div>
          <div className="container">
            <LineChart width={900} height={500} data={data}
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
          </div>
          <div className="container">
            <PieChart width={730} height={250}>
              <Pie data={allocation} dataKey="value" nameKey="name">
                {allocation.map((item, index) => (
                  <Cell key={index} stroke={'#000'} strokeWidth={1} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>
      );
}

export default Home;

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
const CRYPTO_SYMBOLS = ["BINANCE:BTCUSDT", "BINANCE:ETHUSDT", "BINANCE:DOGEUSDT", "SOL", "BINANCE:SHIBUSDT"]
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

    return (
    <>

        <div>
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
        <div className="firstarticle">  
            <a href="/article">
            <img id="photo1" src= {"https://picsum.photos/120"}></img>
            </a>
            <p id="paragraph1"> 
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ac tincidunt vitae semper quis lectus. Dolor sit amet consectetur 
            adipiscing elit pellentesque.
            </p>
        </div>
        <div className="secondarticle">  
            <a href="article">
            <img id="photo2" src= {"https://picsum.photos/120"}></img>
            </a>
            <p id="paragraph2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ac tincidunt vitae semper quis lectus. Dolor sit amet consectetur 
            adipiscing elit pellentesque.
            </p>
        </div>
        <div className="thirdarticle">  
            <a href="/article">
            <img id="photo3" src= {"https://picsum.photos/120"}></img>
            </a>
            <p id="paragraph3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ac tincidunt vitae semper quis lectus. Dolor sit amet consectetur 
            adipiscing elit pellentesque.
            </p>
        </div>
        <div className="myButton">
        <button onClick={Home}>
            Load more news
        </button>
        </div>
    </>

      );
}

export default Home;

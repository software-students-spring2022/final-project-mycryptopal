import './Portfolio.css';
import React, { useState, useEffect, useMemo } from "react";
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

function Portfolio() {
  const CRYPTO_SYMBOLS = ["BTC", "ETH", "USDT", "DOGE" ,"SHIB", "SOL"]
  const INTERVAL_OPTIONS = [30, 60, 90, 120]

  function transformData(data) {
    return data.c.map((item, index) => ({
      close: Number(item).toFixed(5),
      open: Number(data.o[index]).toFixed(5),
      timestamp: new Date(data.t[index] * 1000).toLocaleDateString()
    }))
  }
  const [symbol, setSymbol] = useState(CRYPTO_SYMBOLS[0])
  const [data, setData] = useState(null);
  const [interval, setInterval] = useState(INTERVAL_OPTIONS[0]);

  useEffect(() => {
    if (!symbol | !interval) {
      return;
    }

    fetch(`http://localhost:4000/graph/${symbol}/${interval}`)
      .then(async data => setData(transformData(await data.json())))
      .catch(error => console.error(error))

  }, [symbol, interval]);
  
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
          <div className="container dropdownContainer">
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
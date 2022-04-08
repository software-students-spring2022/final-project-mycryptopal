import './Portfolio.css';
import { useState, useEffect} from "react";
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
  const INTERVAL_OPTIONS = [30, 60, 90, 120]
  const [symbol, setSymbol] = useState('')
  const [data, setData] = useState(null);
  const [interval, setInterval] = useState(INTERVAL_OPTIONS[0]);
  const [assets, setAssets] = useState({});
  const [symbols, setSymbols] = useState([]);

  useEffect(() => {
    async function getAssets() {
      const res = await fetch(`http://localhost:4000/user/assets`);
      const data = await res.json();
      setAssets(data);
    }
    getAssets();
  }, []);

  useEffect(() => {
    setSymbols(Object.keys(assets));
  }, [assets]);

  useEffect(() => {
    setSymbol(symbols[0]);
  }, [symbols]);

  useEffect(() => {
    if (!symbol | !interval) {
      return;
    }
    async function getData() {
      const res = await fetch(`http://localhost:4000/api/crypto/graph/${symbol}?interval=${interval}`);
      const data = await res.json();
      setData(data);
    }
    getData();
  }, [symbol, interval]);
  
  const handleChangeCrypto = event => setSymbol(event.target.value);
    
  const handleChangeInterval = event => setInterval(event.target.value);
  
  return (
      <>
        <div id="page-title">
            <div>My Portfolio</div>
        </div>
        <div id="page-content">
          <div className="container dropdownContainer">
              <div className="selector">
              <label htmlFor="stock_select" className="label">
                  <strong>Stock Symbol: </strong>
              </label>
              <select id="stock_select" onChange={handleChangeCrypto}>
                  {symbols.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              </div>
              <div className="selector">
              <label htmlFor="interval_select" className="label">
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
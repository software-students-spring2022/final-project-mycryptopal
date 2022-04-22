import {useState, useEffect} from 'react';
import './Portfolio.css';
import Typography from '@mui/material/Typography';
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
import axios from 'axios';

function Portfolio() {
  const INTERVAL_OPTIONS = [30, 60, 90, 120];
  const [symbol, setSymbol] = useState('');
  const [data, setData] = useState(null);
  const [interval, setInterval] = useState(INTERVAL_OPTIONS[0]);
  const [assets, setAssets] = useState({});
  const [symbols, setSymbols] = useState([]);
  const [minTick, setMinTick] = useState(0);
  const [maxTick, setMaxTick] = useState(0);

  useEffect(() => {
    async function getAssets() {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/assets`);
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
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/crypto/graph/${symbol}?interval=${interval}`);
        const data = res.data.graphData;
        setData(data.values);
        setMinTick(data.min);
        setMaxTick(data.max);
      } catch (err) {
        console.log('Error fetching ticker data');
        console.log(err);
      }
    }
    getData();
  }, [symbol, interval]);

  const handleChangeCrypto = (event) => setSymbol(event.target.value);

  const handleChangeInterval = (event) => setInterval(event.target.value);

  return (
    <>
      <div id="page-title">
        <Typography variant='h4' fontWeight={'bold'}>My Portfolio</Typography>
      </div>

      <div id="page-content">
        <div className="container dropdownContainer">
          <div className="selector">
            <label htmlFor="stock_select" className="label">
              <strong>Stock Symbol: </strong>
            </label>
            <select id="stock_select" onChange={handleChangeCrypto}>
              {symbols.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="selector">
            <label htmlFor="interval_select" className="label">
              <strong>Interval: </strong>
            </label>
            <select onChange={handleChangeInterval}>
              {INTERVAL_OPTIONS.map((s) => <option key={s} value={s}>Past {s} days</option>)}
            </select>
          </div>
        </div>
        <div className="container">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{'left': 10, 'right': 10, 'top': 10, 'bottom': 10}}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" tick={{fontSize: '80%'}} />

              <YAxis type="number" allowDecimals={true} allowDataOverflow={true} tick={{fontSize: '80%'}}
                domain={[minTick, maxTick]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="open" stroke="green" dot={false} />
              <Line type="monotone" dataKey="close" stroke="blue" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}

export default Portfolio;

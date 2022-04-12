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
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function Crypto() {
  const [coinData, setCoinData] = useState({slug: '', symbol: '', circulating_supply: 0, quote: {USD: {price: 0, percent_change_24h: 0, volume_24h: 0, market_cap: 0}}});
  const [coinGraph, setCoinGraph] = useState(null);
  const [coinInfo, setCoinInfo] = useState('');
  const [coinLogo, setCoinLogo] = useState(`${process.env.REACT_APP_COIN_PLACEHOLDER}`);
  const [minTick, setMinTick] = useState(0);
  const [maxTick, setMaxTick] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [add, setAdd] = useState(false);
  const [drop, setDrop] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const {symbol} = useParams();

  function setColor(number) {
    if(number > 0) {
      return 'green';
    }
    else if(number < 0) {
      return 'red';
    }
    return;
  }

  function handleDialogOpen(evt) {
    const option = evt.target.parentElement.textContent;
    if(option === 'Add') {
      setAdd(true);
      setDrop(false);
    }
    else{
      setDrop(true);
      setAdd(false);
    }
    setDialogOpen(true);
  }

  function handleDialogClose() {
    setDialogOpen(false);
    setAlertOpen(true);
  }

  function handleCancel() {
    setDialogOpen(false);
  }

  function handleAlertClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  }

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
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/crypto/graph/${symbol}?interval=30`);
      const data = await res.json();
      setMinTick(data.min);
      setMaxTick(data.max) ;
      setCoinGraph(data.values);
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
  }, [coinData, symbol]);

  return (
    <>
      <div id="page-title">
        <Typography variant='h4' fontWeight={'bold'}>Analytics</Typography>
      </div>

      <div id="page-content">
        <Grid container spacing={1}>

          <Grid item xs={12}>
            <Grid container spacing={2}>

              <Grid item xs={8} id="crypto-info">
                <Grid container spacing={1} height={'100%'}>

                  <Grid item xs={12}>
                      <Typography variant='h5' fontWeight={'bold'}>
                        {coinData.name} <Chip label={coinData.symbol}/>
                      </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container spacing={0.5}>
                      <Grid item xs={6} >
                        <Typography>
                          Price (USD)
                        </Typography>
                      </Grid>

                      <Grid item xs={6} color={setColor(coinData.quote.USD.percent_change_24h)}>
                        <Typography>
                          {coinData.quote.USD.price.toFixed(5)}
                        </Typography>                      
                      </Grid>

                      <Grid item xs={6}>
                        <Typography>
                          Change (24h)
                        </Typography>
                      </Grid>

                      <Grid item xs={6}>
                        <Typography color={setColor(coinData.quote.USD.percent_change_24h)}>
                          {(coinData.quote.USD.percent_change_24h / 100).toFixed(2)}%
                        </Typography>                         
                      </Grid>
                    </Grid>
                  </Grid> 

                </Grid>
              </Grid>

              <Grid item xs={4} id="crypto-image">
                <img src={coinLogo} alt="Coin"></img>
              </Grid>

            </Grid>
          </Grid>
        
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12} textAlign={'center'} marginBottom={'1vh'}>
                <Typography variant='h5'>
                  Price History (30 Days)
                </Typography>
              </Grid>

              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={coinGraph} margin={{'left': 10, 'right': 10, 'top': 10, 'bottom': 10}}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" tick={{ fontSize: '80%'}} />

                  <YAxis type="number" allowDecimals={true} allowDataOverflow={true} tick={{ fontSize: '80%'}} 
                  domain={[minTick, maxTick]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="open" stroke="green" dot={false} />
                  <Line type="monotone" dataKey="close" stroke="blue" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12} textAlign={'center'} marginBottom={'1vh'}>
                <Typography variant='h5'>
                  Market Stats
                </Typography>
              </Grid>

              <Grid item xs={12} textAlign={'center'} marginBottom={'1vh'}>
                <Grid container spacing={0.5}>
                      <Grid item xs={6} >
                        <Typography>
                          Trading Volume
                        </Typography>
                      </Grid>

                      <Grid item xs={6}>
                        <Typography>
                          {coinData.quote.USD.volume_24h.toLocaleString('en-US')}
                        </Typography>                      
                      </Grid>

                      <Grid item xs={6}>
                        <Typography>
                          Market Cap
                        </Typography>
                      </Grid>

                      <Grid item xs={6}>
                        <Typography>
                          {coinData.quote.USD.market_cap.toLocaleString('en-US')}
                        </Typography>                         
                      </Grid>

                      <Grid item xs={6}>
                        <Typography>
                          Circulating Supply
                        </Typography>
                      </Grid>

                      <Grid item xs={6}>
                        <Typography>
                          {coinData.circulating_supply.toLocaleString('en-US')}
                        </Typography>                         
                      </Grid>                      
                  </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12} textAlign={'center'} marginBottom={'1vh'}>
                <Typography variant='h5'>
                  More Info
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant='subtitle1' textAlign={'justify'}>
                  {coinInfo}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} id="buttons" marginBottom={'2vh'}>
            <Grid container>
              <Grid item xs={6}>
                <Button variant="contained" className="cryptoButtons" onClick={handleDialogOpen}>
                  Add
                </Button>
              </Grid>

              <Grid item xs={6}>
              <Button variant="outlined" className="cryptoButtons" onClick={handleDialogOpen}>
                  Drop
                </Button>
              </Grid>
            </Grid>
          </Grid>

        </Grid>

        <Dialog open={dialogOpen} onClose={handleCancel}>
          <DialogTitle>{(add ? 'Add' : 'Drop')} {coinData.name}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the number of {coinData.symbol} that you would like to {(add ? 'add' : 'drop')}. Your changes will be reflected in your assets graph.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="crypto-amount"
              label="Quantity"
              type="number"
              inputProps={{min: 0}}
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleDialogClose}>Confirm</Button>
          </DialogActions>
        </Dialog>

        <Snackbar open={alertOpen} autoHideDuration={5000} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}} onClose={handleAlertClose}>
            <Alert onClose={handleAlertClose} severity="success" sx={{width: '100%'}}>
              You have successfully {!drop ? 'added' : 'dropped'} {coinData.symbol}!
            </Alert>
          </Snackbar>
      </div>
    </>
  );
}

export default Crypto;

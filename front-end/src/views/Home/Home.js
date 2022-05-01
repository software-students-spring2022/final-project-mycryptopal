import {useState, useEffect} from 'react';
import './Home.css';
import NewsFeed from '../../components/NewsFeed/NewsFeed';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Box from '@mui/system/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import {
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import axios from 'axios';

function Home() {
  const [allocations, setAllocations] = useState([]);
  const [colors, setColors] = useState([]);
  const authHeader = {Authorization: `JWT ${localStorage.getItem('token')}`};
  const [newUserDialogBox, setNewUserDialogBox] = useState(false);

  // API call for mock asset allocation data
  useEffect(() => {
    async function getAllocations() {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/assets`, {headers: authHeader});
      const data = res.data.assets;

      const isEmpty = Object.keys(data).length === 0;
      console.log(data);
      console.log(isEmpty);
      


      const assetSum = Object.values(data).reduce((sum, current) => sum + current, 0);
      const formattedData = Object.keys(data).reduce((result, current, index) => {
        const entry = {};
        entry.name = current;
        entry.value = parseFloat((Object.values(data)[index] / assetSum).toFixed(2));
        result.push(entry);
        return result;
      }, []);
      setAllocations(formattedData);
    }
    getAllocations();
  }, []);


  useEffect(() => {
    function getRandomColor() {
      return '#' + Math.floor(Math.random()*16777215).toString(16).toString();
    }
    const randomColors = new Array(allocations.length).fill(0).map(() => getRandomColor());
    setColors(randomColors);
  }, [allocations]);

  function handleDialogClose() {
    setNewUserDialogBox(false);
    // add code that redirects user to crypto/btc
  }

  return (
    <>
      <div id="page-title">
        <Typography variant='h4' fontWeight={'bold'}>Home</Typography>
      </div>
      <div id="page-content">
        <div id="chart">
          <div className="homeHeader">
            <Typography variant='h5'>Asset Allocations</Typography>
          </div>
          <div id="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={allocations} dataKey="value" nameKey="name">
                  {allocations.map((item, index) => (
                    <Cell key={index} stroke={'#000'} strokeWidth={1} fill={colors[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <Dialog open={newUserDialogBox}>
          <DialogTitle> User Tutorial </DialogTitle>
          <DialogContent>
            <DialogContentText>
            Welcome to MyCryptoPal, the educational cryptocurrency platform of the year! Our team's mission statement
            is to provide users with the ability to learn more about trading cryptocurrency without having to deal with 
            real money. This simulation allows users to learn more about the technology powering blockchain! Let's get 
            started by adding cryptocurrency to your portfolio!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Add BTC</Button>
          </DialogActions>
        </Dialog>
        <div className='divider'></div>
        <div id="news">
          <NewsFeed/>
        </div>
      </div>
    </>
  );
}

export default Home;

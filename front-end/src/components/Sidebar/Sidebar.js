import {useNavigate} from 'react-router-dom';
import './Sidebar.css';
import {slide as Menu} from 'react-burger-menu';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ExploreIcon from '@mui/icons-material/Explore';
import SchoolIcon from '@mui/icons-material/School';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

function Sidebar() {
  let navigate = useNavigate();
  
  return (
    <Menu>
      <Grid id="home" className="menu-item" onClick={() => navigate('/')}>
        <Typography variant='h4' fontWeight={'bold'}>MyCryptoPal</Typography>
      </Grid>

      <Grid id="portfolio" className="menu-item" >
        <Grid container spacing={1} onClick={() => navigate('/portfolio')}>
          <Grid item>
            <AssignmentIcon/>
          </Grid>
          <Grid item>
            <Typography variant='body1' className="subItem">Portfolio</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid id="explore" className="menu-item" >
        <Grid container spacing={1} onClick={() => navigate('/explore')}>
          <Grid item>
            <ExploreIcon />
          </Grid>
          <Grid item>
            <Typography variant='body1' className="subItem">Explore Cryptos</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid id="learn" className="menu-item" >
        <Grid container spacing={1} onClick={() => navigate('/learn')}>
          <Grid item>
            <SchoolIcon />
          </Grid>
          <Grid item>
            <Typography variant='body1' className="subItem">Learn</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid id="contact" className="menu-item" >
        <Grid container spacing={1} onClick={() => navigate('/contact')}>
          <Grid item>
            <AlternateEmailIcon />
          </Grid>
          <Grid item>
            <Typography variant='body1' className="subItem">Contact Us</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid id="settings" className="menu-item" >
        <Grid container spacing={1} onClick={() => navigate('/settings')}>
          <Grid item>
            <SettingsIcon />
          </Grid>
          <Grid item>
            <Typography variant='body1' className="subItem">Settings</Typography>
          </Grid>
        </Grid>
      </Grid>     

      <Grid id="logout" className="menu-item" >
        <Grid container spacing={1} onClick={() => {
          localStorage.removeItem('token')
          window.location.href = '/';}}>
          <Grid item>
            <LogoutIcon />
          </Grid>
          <Grid item>
            <Typography variant='body1' className="subItem">Logout</Typography>
          </Grid>
        </Grid>
      </Grid>    
    </Menu>
  );
}

export default Sidebar;

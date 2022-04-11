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
  return (
    <Menu>
      <a id="home" className="menu-item" href="/">
        <Typography variant='h4' fontWeight={'bold'}>MyCryptoPal</Typography>
      </a>
      <a id="portfolio" className="menu-item" href="/portfolio">
        <Grid container spacing={1}>
          <Grid item>
            <AssignmentIcon/>
          </Grid>

          <Grid item>
            <Typography variant='body1' className="subItem">Portfolio</Typography>
          </Grid>
        </Grid>
      </a>
      <a id="explore" className="menu-item" href="/explore">
        <Grid container spacing={1}>
          <Grid item>
            <ExploreIcon />
          </Grid>

          <Grid item>
            <Typography variant='body1'>Explore Cryptos</Typography>
          </Grid>
        </Grid>
      </a>
      <a id="learn" className="menu-item" href="/learn">
        <Grid container spacing={1}>
          <Grid item>
            <SchoolIcon />
          </Grid>

          <Grid item>
            <Typography variant='body1'>Learn</Typography>
          </Grid>
        </Grid>
      </a>
      <a id="contact" className="menu-item" href="/contact">
        <Grid container spacing={1}>
          <Grid item>
            <AlternateEmailIcon />
          </Grid>

          <Grid item>
            <Typography variant='body1'>Contact Us</Typography>
          </Grid>
        </Grid>
      </a>
      <a id="settings" className="menu-item" href="/settings">
        <Grid container spacing={1}>
          <Grid item>
            <SettingsIcon />
          </Grid>

          <Grid item>
            <Typography variant='body1'>Settings</Typography>
          </Grid>
        </Grid>
      </a>
      <a id="logout" className="menu-item" href="/login">
        <Grid container spacing={1}>
          <Grid item>
            <LogoutIcon />
          </Grid>

          <Grid item>
            <Typography variant='body1'>Logout</Typography>
          </Grid>
        </Grid>
      </a>
    </Menu>
  );
}

export default Sidebar;

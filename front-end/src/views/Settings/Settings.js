import {useEffect, useState} from 'react';
import './Settings.css';
import AvatarUploader from '../../components/AvatarUploader/AvatarUploader';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

function Settings() {
  const [user, setUser] = useState({});

  useEffect(() => {
    async function getUser() {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/data`);
      const data = await res.json();
      setUser(data);
    }
    getUser();
  }, []);

  return (
    <>
      <div id="page-title">
        <div>Settings</div>
      </div>

      <div id="page-content">

        <Grid container spacing={1} alignItems={'center'} justifyContent={'center'} textAlign={'center'} marginBottom={'3vh'}>

          <Grid item xs={12} md={4}>
            <AvatarUploader userId={user.id}/>
          </Grid>

          <Grid item xs={12} md={3.25} id={'personalize-form'} className={'settingsForm'}>
            <form method='POST' action={`${process.env.REACT_APP_BACKEND_URL}/personalize`}>
              <Grid container spacing={2}>

                <Grid item xs={12}>
                  <Typography variant='h5' marginBottom={'1vh'}>
                      Personalize
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField name='firstName' id="fname-field" label="First Name" variant="outlined" placeholder={user.firstName} fullWidth InputLabelProps={{shrink: true}}/>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField name='lastName' id="lname-field" label="Last Name" variant="outlined" placeholder={user.lastName} fullWidth InputLabelProps={{shrink: true}}/>
                </Grid>

                <Grid item xs={12}>
                  <TextField name='username' id="uname-field" label="Username" variant="outlined" placeholder={user.username} fullWidth InputLabelProps={{shrink: true}}/>
                </Grid>

                <Grid item xs={12}>
                  <TextField name='email' id="email-field" label="Email" variant="outlined" placeholder={user.email} fullWidth InputLabelProps={{shrink: true}}/>
                </Grid>

                <Grid item xs={12}>
                  <Button variant="outlined" size='large' type='submit'>Submit</Button>
                </Grid>
              </Grid>
            </form>
          </Grid>

          <Grid item xs={0} md={0.5}></Grid>

          <Grid item xs={12} md={3.25} id={'security-form'} className={'settingsForm'}>
            <form method='POST' action={`${process.env.REACT_APP_BACKEND_URL}/security`}>
              <Grid container spacing={2}>

                <Grid item xs={12}>
                  <Typography variant='h5' marginBottom={'1vh'}>
                        Security
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <TextField id="curr-pass-field" name="currentPassword" label="Current Password" variant="outlined" fullWidth type={'password'} InputLabelProps={{shrink: true}} />
                </Grid>

                <Grid item xs={12}>
                  <TextField id="new-pass-field" name="newPassword" label="New Password" variant="outlined" fullWidth type={'password'} InputLabelProps={{shrink: true}} />
                </Grid>

                <Grid item xs={12}>
                  <TextField id="re-pass-field" name="rePassword" label="Re-enter Password" variant="outlined" fullWidth type={'password'} InputLabelProps={{shrink: true}} />
                </Grid>

                <Grid item xs={12}>
                  <Button variant="outlined" size='large' type='submit'>Submit</Button>
                </Grid>

              </Grid>
            </form>
          </Grid>

        </Grid>
      </div>
    </>
  );
}

export default Settings;

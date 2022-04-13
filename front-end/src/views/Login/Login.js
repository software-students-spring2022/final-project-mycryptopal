import { useState, useEffect } from 'react';
import './Login.css';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';

function Login() {

  const [response, setResponse] = useState({});

  async function handleSubmit(evt) {
    evt.preventDefault();

    const credentials = {
      username: evt.target.username.value,
      password: evt.target.password.value
    }

    axios
    .post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, credentials)
    .then((res) => {
      console.log(`Server response: ${JSON.stringify(res.data, null, 0)}`);
      setResponse(res.data);
    })
    .catch(err => console.log(err));
  }

  useEffect(() => {
    if (response.success && response.token) {
      console.log(`User successfully logged in: ${response.username}`);
      localStorage.setItem("token", response.token);
      window.location.href = '/';
    }
  }, [response]);

  return (
    <>
      <Grid container className="formContainer">
        <Grid item className="formVertical formSurrounds" xs={12} md={12}></Grid>

        <Grid item md={12} className="formMiddle">
          <Grid container height={'100%'} width={'100%'}>

            <Grid item xs={0.5} md={4} className="formLeft formSurrounds"></Grid>

            <Grid item xs={11} md={4} className="formBody">
              <Stack>

                <div className="tagLine">
                  <Typography fontSize={'3vh'}>
                    Ready to Level Up Your Investing Career?
                  </Typography>
                </div>

                {/* <div className="appLogo">
                  <img src="https://picsum.photos/1000" alt="MyCryptoPal Logo"/>
                </div> */}

                <div className="entryForm">
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3} alignItems={'center'} justifyContent={'center'}>

                      <Grid item xs={12} md={7}>
                        <TextField name='username' id="login-user" className="credentials" label="Username" variant="outlined" InputLabelProps={{shrink: true}} required/>
                      </Grid>

                      <Grid item xs={12} md={7}>
                        <TextField name='password' id="login-pass" className="credentials" label="Password" type={'password'} variant="outlined" InputLabelProps={{shrink: true}} required/>
                      </Grid>

                      <Grid item xs={12}>
                        <Button variant="outlined" size='large' type='submit'>Sign In</Button>
                      </Grid>

                      <Grid item xs={12} className='helperText' marginTop={'-0.5vh'}>
                        <Button variant="text" size='small' onClick={() => {
                          window.location.href='/login';
                        }}>Forgot Password?</Button>
                      </Grid>

                      <Grid item xs={12} className='helperText' marginTop={'-1.75vh'}>
                        <Button variant="text" size='small' onClick={() => {
                          window.location.href='/registration';
                        }}>Don't Have An Account? Register Here!</Button>
                      </Grid>

                    </Grid>

                  </form>
                </div>
              </Stack>
            </Grid>

            <Grid item xs={0.5} md={4} className="formRight formSurrounds"></Grid>

          </Grid>
        </Grid>

        <Grid item className="formVertical formSurrounds" xs={12} md={12}></Grid>

      </Grid>
    </>
  );
}

export default Login;
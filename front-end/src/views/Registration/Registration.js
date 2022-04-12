import './Registration.css';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';

function Registration() {

  async function handleSubmit(evt) {
    evt.preventDefault();

    const inputCredentials = {
      username: evt.target.username.value,
      email: evt.target.email.value,
      password: evt.target.password.value,
      reenter: evt.target.reenter.value
    }

    axios
    .post(`${process.env.REACT_APP_BACKEND_URL}/register`, inputCredentials)
    .then((res) => console.log(res))
    .catch(err => console.log(err));
  }

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
                      Start Your Journey Today!
                  </Typography>
                </div>

                <div className="appLogo">
                  <img src="https://picsum.photos/1000" alt="MyCryptoPal Logo"/>
                </div>

                <div className="entryForm">
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} alignItems={'center'} justifyContent={'center'}>

                      <Grid item xs={12} md={7}>
                        <TextField name='username' id="register-user" className="credentials" label="Username" variant="outlined" InputLabelProps={{shrink: true}} required/>
                      </Grid>

                      <Grid item xs={12} md={7}>
                        <TextField name='email' id="register-email" className="credentials" label="Email" variant="outlined" InputLabelProps={{shrink: true}} required/>
                      </Grid>

                      <Grid item xs={12} md={7}>
                        <TextField name='password' id="register-pass" className="credentials" label="Password" type={'password'} variant="outlined" InputLabelProps={{shrink: true}} required/>
                      </Grid>

                      <Grid item xs={12} md={7}>
                        <TextField name='reenter' id="register-reenter" className="credentials" label="Re-enter Password" type={'password'} variant="outlined" InputLabelProps={{shrink: true}} required/>
                      </Grid>

                      <Grid item xs={12}>
                        <Button variant="outlined" size='large' type='submit'>Register</Button>
                      </Grid>

                      <Grid item xs={12} className='helperText' id='register-helper'>
                        <Button variant="text" size='small' onClick={() => {
                          window.location.href='/login';
                        }}>Have an Account? Sign In Here!</Button>
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

export default Registration;

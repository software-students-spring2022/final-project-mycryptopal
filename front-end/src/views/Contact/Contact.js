import './Contact.css';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import {useEffect, useState} from 'react';

function Contact() {
  const [faqs, setFAQs] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    async function getFAQs() {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/faqs`);
      const data = await res.json();
      setFAQs(data);
    }
    getFAQs();
  }, []);

  function handleAlertClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  };

  return (
    <>
      <div id="page-title">
        <div>Contact Us</div>
      </div>

      <div id="page-content">
        <Grid container direction={'column'} spacing={3}>
          <Grid item id="frequently-asked">
            <Typography variant='h5' marginBottom={'3vh'}>
              Frequently Asked Questions
            </Typography>
            { (faqs ?
                faqs.map((element, i) => {
                  return (
                    <Accordion key={i}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography variant='subtitle1' align='justify'>
                          {element.question}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography variant='body2' align='justify'>
                          {element.answer}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  );
                }) : (<></>))
            }
          </Grid>

          <Grid item id="contact-us">
            <Typography variant='h5' marginBottom={'3vh'}>
              Still Need Help? Contact Us!
            </Typography>
            <form id="contact-form" onSubmit={(evt) => {
              evt.preventDefault();
              const postRequest = {};
              const formData = new FormData(document.querySelector('#contact-form'));
              for (const pair of formData.entries()) {
                postRequest[pair[0]] = pair[1];
              }
              axios
                  .post(`${process.env.REACT_APP_BACKEND_URL}/contact`, postRequest, {})
                  .then(() => {
                    setAlertOpen(true);
                  })
                  .catch((err) => console.log(err));
            }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField name='contactName' id="contact-name" label="Your Name" variant="outlined" fullWidth />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField name='contactEmail' id="contact-email" label="Your Email" variant="outlined" fullWidth/>
                </Grid>

                <Grid item xs={12}>
                  <TextField name='contactMessage' id="contact-message" label="Your Message" variant="outlined" multiline rows={12} fullWidth />
                </Grid>

                <Grid item xs={12} justifyContent={'flex-end'}>
                  <Box display="flex" justifyContent="flex-end">
                    <Button variant="outlined" size='large' type='submit'>Submit</Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Grid>

          <Snackbar open={alertOpen} autoHideDuration={5000} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}} onClose={handleAlertClose}>
            <Alert onClose={handleAlertClose} severity="success" sx={{width: '100%'}}>
            Thank you for your message! Our team will get back to you as soon as possible :)
            </Alert>
          </Snackbar>
        </Grid>
      </div>
    </>
  );
}

export default Contact;

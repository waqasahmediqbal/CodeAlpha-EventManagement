import React, { useState } from 'react';
import { Container, Grid, TextField, Typography,Button } from '@mui/material';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSignup = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(formData);
    try {
      const response = await axios.post(
        'https://cute-tan-coral-boot.cyclic.app/api/user/',body,config
      );
      const authToken = response.data.token;
      localStorage.setItem('authToken', authToken);
      console.log(response.data); 
     await navigate('/'); 
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };
  

  return (
      <Container maxWidth="sm">
      <Typography
            variant="h4"
            noWrap
            sx={{
              display: { xs: "none", md: "block" },
              fontWeight: 700,
            }}
            mb={3}
            mt={15}
            align='center'
          >
Registration
        </Typography>
        <Typography
            variant="h5"
            noWrap
            sx={{
              display: { xs: "block", md: "none" },
              fontWeight: 700,
            }}
            mb={3}
            mt={15}
            align='center'
          >
Registration
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
          <Typography variant='subtitle2' mb={1}>Name</Typography>
            <TextField fullWidth placeholder='Enter your full name' sx={{bgcolor:"white",'& fieldset': { border: 'none' }}} 
             name="name"
             onChange={handleChange}
            />
          </Grid>
         
          <Grid item xs={12}>
          <Typography variant='subtitle2' mb={1}>Email Address</Typography>
            <TextField fullWidth placeholder='Enter your email address' sx={{bgcolor:"white",'& fieldset': { border: 'none' }}}
             name="email"
             onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
          <Typography variant='subtitle2' mb={1}>Password</Typography>
            <TextField fullWidth placeholder='Enter your password' sx={{bgcolor:"white",'& fieldset': { border: 'none' }}}
                      type="password"
                      name="password"
                      onChange={handleChange}
                      />
            <Typography variant='subtitle2' mt={1}>Already have an account? Sign in</Typography>
          </Grid>
          <Grid item xs={12} mt={3}>
            <Button fullWidth variant='contained' onClick={handleSignup} sx={{bgcolor: "#7848F4",textTransform:"none"}}>Sign up</Button>
          </Grid>
        </Grid>
      </Container>
  );
}

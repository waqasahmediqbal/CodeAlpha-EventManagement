import React, { useCallback,useState } from 'react';
import axios from 'axios';
import { Container, Grid, TextField, Typography,Button, Input } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [formData, setFormData] = useState({
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
  const handleSignin = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(formData);
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/',body,config
      );
      const authToken = response.data.token;
      localStorage.setItem('authToken', authToken);
      console.log(response.data); 
      await navigate('/'); 
    } catch (error) {
      console.error('Error during login:', error);
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
Sign In
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
          >Sign In
        </Typography>
        <Grid container spacing={3}>         
          <Grid item xs={12}>
          <Typography variant='subtitle2' mb={1}>Email Address</Typography>
            <TextField fullWidth placeholder='Enter your email address' sx={{bgcolor:"white",'& fieldset': { border: 'none' }}} name='email'  onChange={handleChange}/>
          </Grid>
          <Grid item xs={12}>
          <Typography variant='subtitle2' mb={1}>Password</Typography>
            <TextField fullWidth placeholder='Enter your password' sx={{bgcolor:"white",'& fieldset': { border: 'none' }}} name='password' type='password' onChange={handleChange}/>
            <Typography variant='subtitle2' mt={1}>Don't have an account? Sign Up</Typography>
          </Grid>
          <Grid item xs={12} mt={3}>
            <Button fullWidth variant='contained' type='submit' onClick={handleSignin} sx={{bgcolor: "#7848F4",textTransform:"none"}}>Sign in</Button>
          </Grid>
        </Grid>
      </Container>
  );
}

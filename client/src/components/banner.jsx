import { Button, Container, Grid ,Hidden,Typography} from '@mui/material'
import React from 'react'
import bannerImg from '../assets/banner-img.png'
import { useNavigate } from 'react-router-dom'

export default function banner() {
  const navigate = useNavigate();
  return (
        <Grid container sx={{bgcolor: '#10107b',position:"absolute",right:0,height:'15rem',marginTop:'10vw',color:'#fff'}} spacing={3}>  
            <Grid item xs={1}/>
            <Hidden mdDown>
            <Grid item xs={5}>
                <img src={bannerImg} style={{width:'100%',height:'18rem',marginTop:'-4.5rem'}}/>
            </Grid></Hidden>
            <Grid item xs={10} md={5}>
                <Typography variant="h4" mt={3}>Make your own Event </Typography>
                <Typography variant="h6" mt={2} mb={2}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
                <Button onClick={() => navigate('/event/create')} variant="contained" sx={{ bgcolor: "#7848F4",textTransform:'none' }}>
              Create Events
            </Button>
            </Grid>
            <Grid item xs={1}/>
        </Grid>
  )
}

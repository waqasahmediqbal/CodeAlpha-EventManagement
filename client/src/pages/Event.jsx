import React, { useEffect, useState } from 'react'
import Events from '../components/events'
import { Container,Typography,Grid } from '@mui/material'
import axios from 'axios'
 
function Event() {
  const [eventData,setEventData] = useState([])
  useEffect( () => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events/');
        if (response.status === 200) {
          setEventData(response.data);
          console.log(response.data)
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData(); 
  },[])
  if(!eventData){
    return <div>Loading...</div>;
  }
  return (
    <Container maxWidth="lg" sx={{alignItems:'center',justifyContent:'center',}}>
      <Typography
            variant="h4"
            noWrap
            mb={2}
            mt={2}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              color: "#000",
            }}
          >
            Upcoming  <span style={{ marginLeft: "6px", color: "#7848F4" }}>Events</span>
          </Typography>
    <Typography
            variant="h5"
            noWrap
            mb={2}
            mt={1}
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              color: "inherit",
            }}
          >
            Upcoming
            <span style={{ marginLeft: "6px", color: "#7848F4" }}>Events</span>
          </Typography>
    <Grid container spacing={3}>
     
    {eventData.map(event => (
          <Grid item key={event._id} xs={12} sm={6} md={4}>
            <Events event={event} />
          </Grid>
        ))}
    
    </Grid>
        </Container>
  )
}

export default Event
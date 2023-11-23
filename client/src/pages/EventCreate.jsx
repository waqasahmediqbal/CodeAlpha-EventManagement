import React, { useCallback, useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import { Container, Grid, TextField, Typography, Button, Input, Box,Select,MenuItem } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Icon } from '@iconify/react';

export default function EventCreate() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [eventData, setEventData] = useState({
    title: '',
    fromTime: '',
    endTime: '',
    date: '',
    location: '',
    description: '',
    organizer:  '',
    speakers: ''
  });
  const navigate = useNavigate();
  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])
  const onDrop = useCallback((acceptedFiles) => {
    const image = acceptedFiles[0];
    setSelectedImage(Object.assign(image, { preview: URL.createObjectURL(image) }));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*', // Specify accepted file types (images in this case)
  });

  const handleRemove = () => {
    setSelectedImage(null);
  };

  const handleChange = (field, value) => {
    if (field === 'date') {
      setEventData((prevData) => ({ ...prevData, [field]: value }));
    } else {
      setEventData((prevData) => ({ ...prevData, [field]: value }));
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('title', eventData.title);
      formData.append('fromTime', eventData.fromTime);
      formData.append('endTime', eventData.endTime);
      formData.append('date', new Date(eventData.date).toISOString().split('T')[0]); // Format date
      formData.append('location', eventData.location);
      formData.append('description', eventData.description);
      formData.append('organizer', eventData.organizer);
      formData.append('speakers', eventData.speakers);
      formData.append('category', 'seminar');
      if (selectedImage) {
        formData.append('picture', selectedImage);
      }

      const response = await axios.post('http://localhost:5000/api/events/', formData);
      if (response.status === 200) {
        navigate('/');
      } else {
        console.error('Error creating event:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating event:', error.message);
    }
  };

  return (
    <Container maxWidth="lg">
      <Navbar />
      <Container maxWidth="md">
        <Box>
          <Button
            onClick={() => {
              navigate('/');
            }}
            color="inherit"
            sx={{ textTransform: 'none' }}
            startIcon={<Icon icon="eva:arrow-ios-back-fill" />}
          >
            Back
          </Button>
        </Box>
        <Typography
          variant="h4"
          noWrap
          sx={{
            display: { xs: 'none', md: 'block' },
            fontWeight: 700,
          }}
          mb={3}
          align="center"
        >
          Create Event
        </Typography>
        <Typography
          variant="h5"
          noWrap
          sx={{
            display: { xs: 'block', md: 'none' },
            fontWeight: 700,
          }}
          mb={3}
          align="center"
        >
          Create Event
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="subtitle2" mb={1}>
              Event Title
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter your event title"
              sx={{ bgcolor: 'white', '& fieldset': { border: 'none' } }}
              name="title"
              onChange={(e) => handleChange('title', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" mb={1}>
              Organizer
            </Typography>
            <TextField
              fullWidth
              placeholder='Enter your organizer name'
              sx={{ bgcolor: 'white', '& fieldset': { border: 'none' } }}
              name="organizer"
              onChange={(e) => handleChange('organizer', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" mb={1}>
              Speakers
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter your event speaker name"
              sx={{ bgcolor: 'white', '& fieldset': { border: 'none' } }}
              name="speakers"
              onChange={(e) => handleChange('speakers', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
        <Typography variant="subtitle2" mb={1}>
          Start Time
        </Typography>
        <Select
          fullWidth
          value={eventData.fromTime}
          onChange={(e) => handleChange('fromTime', e.target.value)}
          sx={{ bgcolor: 'white', '& fieldset': { border: 'none' } }}
        >
                  <MenuItem value="08:00 AM">08:00 AM</MenuItem>
          <MenuItem value="09:00 AM">09:00 AM</MenuItem>
          <MenuItem value="10:00 AM">10:00 AM</MenuItem>
          <MenuItem value="11:00 AM">11:00 AM</MenuItem>
          <MenuItem value="12:00 PM">12:00 PM</MenuItem>
          <MenuItem value="01:00 PM">01:00 PM</MenuItem>
          <MenuItem value="02:00 PM">02:00 PM</MenuItem>
          <MenuItem value="03:00 PM">03:00 PM</MenuItem>
          <MenuItem value="04:00 PM">04:00 PM</MenuItem>
          <MenuItem value="05:00 PM">05:00 PM</MenuItem>
          <MenuItem value="06:00 PM">06:00 PM</MenuItem>
          <MenuItem value="07:00 PM">07:00 PM</MenuItem>
          <MenuItem value="08:00 PM">08:00 PM</MenuItem>

          {/* Add more time options as needed */}
        </Select>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="subtitle2" mb={1}>
          End Time
        </Typography>
        <Select
          fullWidth
          value={eventData.endTime}
          onChange={(e) => handleChange('endTime', e.target.value)}
          sx={{ bgcolor: 'white', '& fieldset': { border: 'none' } }}
        >
          <MenuItem value="08:00 AM">08:00 AM</MenuItem>
          <MenuItem value="09:00 AM">09:00 AM</MenuItem>
          <MenuItem value="10:00 AM">10:00 AM</MenuItem>
          <MenuItem value="11:00 AM">11:00 AM</MenuItem>
          <MenuItem value="12:00 PM">12:00 PM</MenuItem>
          <MenuItem value="01:00 PM">01:00 PM</MenuItem>
          <MenuItem value="02:00 PM">02:00 PM</MenuItem>
          <MenuItem value="03:00 PM">03:00 PM</MenuItem>
          <MenuItem value="04:00 PM">04:00 PM</MenuItem>
          <MenuItem value="05:00 PM">05:00 PM</MenuItem>
          <MenuItem value="06:00 PM">06:00 PM</MenuItem>
          <MenuItem value="07:00 PM">07:00 PM</MenuItem>
          <MenuItem value="08:00 PM">08:00 PM</MenuItem>

        </Select>
      </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" mb={1}>
              Date
            </Typography>
            <TextField
              type="date"
              fullWidth
              sx={{ bgcolor: 'white', '& fieldset': { border: 'none' } }}
              name="date"
              onChange={(e) => handleChange('date', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" mb={1}>
              Event Venue
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter your event location"
              sx={{ bgcolor: 'white', '& fieldset': { border: 'none' } }}
              name="location"
              onChange={(e) => handleChange('location', e.target.value)}
            />
          </Grid>
          
        </Grid>

        <Typography
          variant="h4"
          noWrap
          sx={{
            display: { xs: 'none', md: 'block' },
            fontWeight: 700,
          }}
          mb={3}
          align="center"
          mt={3}
        >
          Event Description
        </Typography>
        <Typography
          variant="h5"
          noWrap
          sx={{
            display: { xs: 'block', md: 'none' },
            fontWeight: 700,
          }}
          mb={3}
          mt={3}
          align="center"
        >
          Event Description
        </Typography>
        <Typography variant="subtitle2" mb={1}>
          Event Picture
        </Typography>
        <Grid
          item
          xs={12}
          {...getRootProps()}
          sx={{
            bgcolor: '#ececec',
            borderRadius: '1rem',
            textAlign: 'center',
            height: '20rem',
            padding: '0.5rem',
          }}
        >
          <Input {...getInputProps()} />
          {selectedImage ? (
            <>
              <img
                src={selectedImage.preview}
                alt={selectedImage.name}
                style={{ width: '100%',height:"100%", borderRadius: '1rem' }}
              />
            </>
          ) : (
            <Typography mt={10} variant="subtitle2">
              Drag 'n' drop some pictures here, or click to select files
            </Typography>
          )}
        </Grid>
        {selectedImage && (
          <Button
            fullWidth
            variant="text"
            onClick={handleRemove}
            color="error"
            sx={{ textTransform: 'none' }}
          >
            Remove Image
          </Button>
        )}
        <Grid container spacing={3} mt={1}>
          <Grid item xs={12}>
            <Typography variant="subtitle2" mb={1}>
              Event Description
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Type here..."
              sx={{ bgcolor: 'white', border: 'none', '& fieldset': { border: 'none' } }}
              name="description"
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              onClick={handleSubmit}
              variant="contained"
              sx={{ bgcolor: '#7848F4', textTransform: 'none', marginBottom: '3rem' }}
            >
              Create Event
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
}

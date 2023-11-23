import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { Stack } from '@mui/material';

export default function MediaCard({ event }) {
  const navigate = useNavigate();
  const { _id, title, date, location, picture, fromTime } = event;
  const serverBaseUrl = 'http://localhost:5000';
  const pictureUrl = `${serverBaseUrl}/${picture.replace(/\\/g, '/')}`;

  const fdate = new Date(date);
  const formattedDate = fdate.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Card
      sx={{
        padding: '1rem 1rem 0 1rem',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
      onClick={() => navigate(`/event/${_id}`)}
    >
      <CardMedia
        sx={{ height: '15rem', borderRadius: '0.3125rem' }}
        image={pictureUrl}
        title={title}
      />
      <CardContent sx={{ margin: '0', padding: '0' }}>
        <Typography gutterBottom variant="body1" sx={{ fontWeight: '500' }} component="div" mt={1}>
          {title}
        </Typography>
        <Typography gutterBottom variant="subtitle2" sx={{ marginTop: '0.5rem', fontWeight: '500', color: 'grey' }}>
          <Icon icon="typcn:time" />{' '}
          {formattedDate}, {fromTime}
        </Typography>
        <Stack mt={2} direction="row" alignItems="center" spacing={1}> <Icon icon="mdi:location" color='#7848F4' /> <Typography gutterBottom variant="subtitle2" sx={{ color: '#7848F4' }}>
          {location}
        </Typography></Stack>
       
      </CardContent>
    </Card>
  );
}

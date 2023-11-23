import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar.jsx";
import { Container, Grid, Typography, Button, Avatar, Stack } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import axios from "axios";
import Loading from "../components/loading.jsx";
import avatar from '../assets/avatar_12.jpg'
import avatar1 from '../assets/avatar_18.jpg'

export default function Layout() {
  const [eventData, setEventData] = useState(null);
  const navigate = useNavigate();
  const { _id } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/events/${_id}`
        );
        if (response.status === 200) {
          setEventData(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);
  if (!eventData) {
    return <Loading />;
  }
  const {
    title,
    description,
    picture,
    location,
    date,
    organizer,
    speakers,
    fromTime,
    endTime,
  } = eventData;
  const serverBaseUrl = "http://localhost:5000";
  const pictureUrl = `${serverBaseUrl}/${picture.replace(/\\/g, "/")}`;
  return (
    <Container maxWidth="xl">
      <Navbar />
      <div
        style={{ position: "relative", width: "100%", marginBottom: "4rem" }}
      >
        <div style={{ position: "relative", height: "37rem" }}>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              borderRadius: "0.625rem",
              background: "rgba(19, 19, 21, 0.50)",
            }}
          ></div>
          <img
            src={pictureUrl}
            alt="Cover"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "0.625rem",
            }}
            loading="lazy"
          />
        </div>
      </div>
      <Container maxWidth="lg">
        <Grid container spacing={10}>
          <Grid
            item
            xs={10}
            sm={6}
            style={{
              position: "absolute",
              top: "8%",
              left: "1%",
              color: "white",
            }}
          >
            <Button
              onClick={() => navigate("/")}
              startIcon={<Icon icon="eva:arrow-ios-back-fill" />}
              variant="contained"
              sx={{ bgcolor: "#7848F4" }}
            >
              Back
            </Button>
            <Typography variant="h2" gutterBottom mt={5} mb={3}>
              {title}
            </Typography>
            <Typography variant="h4">{location}</Typography>
          </Grid>
          <Grid item xs={12} md={7}>
            <Typography variant="h5" mb={2}>
              Description
            </Typography>
            <Typography
              sx={{ color: "#7E7E7E", lineHeight: "2" }}
              variant="body2"
            >
              {description}
            </Typography>
            <Typography variant="h5" mt={3} mb={2}>
              Hours
            </Typography>
            <Typography variant="body2">
              {fromTime} - {endTime}
            </Typography>
          </Grid>

          <Grid item xs={12} md={5}>
            <Typography variant="h5" mb={2}>
              Event Location
            </Typography>
            <img
              src="https://s3-alpha-sig.figma.com/img/9f9c/575c/5abfed8372ef0cd7d36dbfb7f9fbbe6f?Expires=1701648000&Signature=Rx1gOYPlg7MVOJ62c9b9W419J8PriQGWR9XsA1IWZzZJUp67whmK9ubILw6gSVOQLnvNPEJMDYEuksKmurme0SVOLHd6t-dsjWqJCpYqeqxDR37wtVS8ahfvVMz6mZPmSWVtTJ1bdibHFN31cXI9oygjerA3Pb1u-7IBB6VI~K6KJIMibpJRfkdcmL1UK9zTcqgckirAAqexVgej29VpjTroXlPUswwz-eaVUMHwk0NTjWcszUtuUEeZEH8i01cF1gdgf2S4J75mdAKxPzjBSWLYqUpj9IfUlnbQoTfNgNfqMSuWTFZqgeq9h16nTxSj5aq~t4f-FYF9nFkSDBdCig__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
              style={{ width: "100%", height: "16.25rem" }}
            />
            <Grid item xs={6}>
              <Typography variant="h5" mt={3} mb={2}>
                Organizer
              </Typography>
              <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar src={avatar}  rounded/><Typography variant="body2">{organizer}</Typography></Stack>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5" mt={3} mb={2}>
                Speaker
              </Typography>
              <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar src={avatar1}  rounded/><Typography variant="body2">{speakers}</Typography></Stack>
            </Grid>{" "}
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
}

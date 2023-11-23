import React, { useEffect, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import image from "../assets/header-img.jpg";

export default function Header() {
  const [textVisibility, setTextVisibility] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextVisibility((prevVisibility) =>
        prevVisibility < 26 ? prevVisibility + 1 : prevVisibility
      );
    }, 100); // Adjust the interval time as needed

    return () => clearInterval(interval);
  }, []);

  const fullText = "Made for those who do";

  const visibleText = fullText.slice(0, textVisibility);

  return (
    <Container maxWidth="xlg">
      <Grid container position="relative">
        <Grid item xs={12}>
          <img
            src={image}
            alt="Header"
            style={{
              width: "100%",
              borderRadius: "0.5rem",
              height: "37rem",
              objectFit: "cover",
              marginBottom: "2rem",
            }}
          />
          <Typography
            sx={{
              position: "absolute",
              top: "10vw",
              color: "#fff",
              left: "27.5%",
              right: "27.5%",
              fontWeight: "700",
              textTransform: "uppercase",
              width: "45%",
              textAlign: "center",
              lineHeight: "normal",
              fontSize: "4rem",
              display: { xs: "none", md: "flex" },
            }}
          >
            {visibleText}
          </Typography>
          <Typography
            sx={{
              position: "absolute",
              top: "30vw",
              color: "#fff",
              left: "27.5%",
              right: "27.5%",
              fontWeight: "700",
              textTransform: "uppercase",
              width: "45%",
              textAlign: "center",
              lineHeight: "normal",
              fontSize: "3rem",
              display: { xs: "flex", md: "none" },
            }}
          >
            {visibleText}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

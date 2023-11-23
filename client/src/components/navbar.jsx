import * as React from "react";
import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function TopBar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    setIsAuthenticated(!!authToken);
  }, []);
  return (
    <AppBar
      position="static"
      sx={{
        background: "transparent",
        color: "#000",
        boxShadow: "none",
        marginTop: "1rem",
        marginBottom: "1rem",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h4"
            noWrap
            sx={{
              mr: 1,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              color: "#000",
            }}
          >
            Event
          </Typography>
          <Typography
            variant="h4"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              color: "#7848F4",
            }}
          >
            Hive
          </Typography>
          <Typography
            variant="h5"
            noWrap
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              color: "inherit",
            }}
          >
            Event
            <span style={{ marginLeft: "6px", color: "#7848F4" }}>Hive</span>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }} />
          {!isAuthenticated ? (
            <Box sx={{ flexGrow: 0 }}>
              <Button
                onClick={() => navigate("/auth/login")}
                sx={{
                  color: "#7848F4",
                  marginRight: "1rem",
                  textTransform: "none",
                }}
              >
                Login
              </Button>
              <Button
                onClick={() => navigate("/auth/register")}
                variant="contained"
                sx={{ bgcolor: "#7848F4", textTransform: "none" }}
              >
                Signup
              </Button>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Button
                onClick={async () => {
                  localStorage.removeItem("authToken");
                  await navigate("/auth/login");
                  console.log('logout')
                }}
                variant="contained"
                sx={{ bgcolor: "#7848F4", textTransform: "none" }}
              >
                Logout
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default TopBar;

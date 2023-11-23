import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, lazy } from 'react';
import './App.css';
import Home from './components/layout';
import Event from './pages/EventView';
import EventCreate from './pages/EventCreate';
import Signup from './pages/SignUp';
import Login from './pages/Login';
import setAuthToken from './utils/setAuthToken';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    setIsAuthenticated(!!authToken);

    if (localStorage.authToken) {
      setAuthToken(localStorage.authToken);
    } else {
      // Redirect to login if not authenticated
      navigate('/auth/login');
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/auth/login" />} />
      <Route path="/event/:_id" element={<Event />} />
      <Route path="/event/create" element={isAuthenticated ? <EventCreate /> : <Navigate to="/auth/login" />} />
      <Route path="/auth/register" element={isAuthenticated ? <Navigate to="/" /> : <Signup />} />
      <Route path="/auth/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
    </Routes>
  );
}

export default App;

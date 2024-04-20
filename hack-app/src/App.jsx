// App.js
import React from "react";
import MapComponent from "./components/mapcomponent";
import WeatherCard from "./components/WeatherCard";
import MapLanding from "./components/MapLanding";
import LandingPage from "./components/LandingPage";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { GoogleOAuthProvider } from "@react-oauth/google";
// import EmergencyServicesFinder from "./components/Notifs";
// import TrafficMap from "./components/Traffic";

const App = () => {
  return (
    <GoogleOAuthProvider clientId="979404826140-4kr357pq71slm1j1as2f2j9p4ifmi40r.apps.googleusercontent.com">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/map" element={<MapLanding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/starttest" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;

// App.js
import React from "react";
import Map from "./components/Map";
// import Map from './Map';
import MapComponent from "./components/mapcomponent";
import WeatherComponent from "./components/WeatherCard";

const App = () => {
  return (
    <div>
      <h1>Live Location Map</h1>
      {/* <Map /> */}
      <MapComponent/>
      <WeatherComponent/>
    </div>
  );
};

export default App;

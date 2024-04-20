// App.js
import React from "react";
import Map from "./components/Map";
// import Map from './Map';
import MapComponent from "./components/mapcomponent";

const App = () => {
  return (
    <div>
      <h1>Live Location Map</h1>
      {/* <Map /> */}
      <MapComponent/>
    </div>
  );
};

export default App;

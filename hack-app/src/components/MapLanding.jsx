import React from "react";
import MapComponent from "./mapcomponent";
import WeatherCard from "./WeatherCard";

function MapLanding() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: 1, overflowY: "auto", position: "sticky", top: 0 }}>
        <MapComponent />
      </div>
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          position: "relative", // Set position to relative
        }}
      >
        <div style={{ position: "absolute", top: 0, left: 0 }}>
          {" "}
          {/* Set position to absolute */}
          <WeatherCard />
        </div>
      </div>
    </div>
  );
}

export default MapLanding;

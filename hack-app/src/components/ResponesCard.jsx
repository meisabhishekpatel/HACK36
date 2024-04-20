import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import coordinates from "../assets/coordinate";

const ResponseCard = ({ apiKey, latitude, longitude }) => {
  const [weatherData, setWeatherData] = useState(null);
  // const coordinates = [
  //   { lat: 25.50375, lng: 81.87012 },
  //   { lat: 25.49217, lng: 81.86762 },
  //   { lat: 25.49212, lng: 81.86776 },
  //   { lat: 25.49208, lng: 81.86825 },
  //   { lat: 25.49205, lng: 81.86842 },
  //   { lat: 25.49159, lng: 81.86843 },
  //   { lat: 25.49115, lng: 81.86843 },
  //   { lat: 25.49115, lng: 81.86794 },
  //   { lat: 25.49115, lng: 81.86706 },
  //   { lat: 25.49116, lng: 81.86692 },
  //   { lat: 25.49116, lng: 81.86683 },
  //   { lat: 25.49147, lng: 81.86683 },
  //   { lat: 25.49165, lng: 81.86683 },
  //   { lat: 25.49171, lng: 81.86684 },
  //   { lat: 25.49172, lng: 81.86685 },
  //   { lat: 25.49182, lng: 81.86685 },
  //   { lat: 25.49193, lng: 81.86691 },
  //   { lat: 25.49224, lng: 81.86713 },
  //   { lat: 25.49255, lng: 81.86737 },
  //   { lat: 25.49257, lng: 81.86738 },
  //   { lat: 25.4929, lng: 81.86765 },
  //   { lat: 25.49361, lng: 81.86824 },
  //   { lat: 25.49363, lng: 81.86826 },
  //   { lat: 25.49447, lng: 81.86897 },
  //   { lat: 25.49488, lng: 81.86931 },
  //   { lat: 25.49495, lng: 81.86936 },
  //   { lat: 25.49508, lng: 81.86946 },
  //   { lat: 25.4951, lng: 81.86948 },
  //   { lat: 25.49512, lng: 81.86951 },
  //   { lat: 25.49513, lng: 81.86952 },
  //   { lat: 25.49513, lng: 81.86953 },
  //   { lat: 25.49514, lng: 81.86954 },
  //   { lat: 25.49543, lng: 81.86971 },
  //   { lat: 25.49567, lng: 81.86987 },
  //   { lat: 25.49583, lng: 81.86995 },
  //   { lat: 25.49611, lng: 81.86966 },
  //   { lat: 25.49621, lng: 81.86955 },
  //   { lat: 25.49632, lng: 81.86939 },
  //   { lat: 25.49639, lng: 81.86927 },
  //   { lat: 25.49643, lng: 81.8692 },
  //   { lat: 25.49646, lng: 81.86912 },
  //   { lat: 25.49648, lng: 81.86905 },
  //   { lat: 25.49648, lng: 81.86896 },
  //   { lat: 25.49648, lng: 81.86886 },
  //   { lat: 25.49667, lng: 81.86888 },
  //   { lat: 25.4967, lng: 81.86889 },
  //   { lat: 25.49715, lng: 81.86894 },
  //   { lat: 25.49779, lng: 81.86903 },
  //   { lat: 25.498, lng: 81.86907 },
  //   { lat: 25.49851, lng: 81.86915 },
  //   { lat: 25.49889, lng: 81.8692 },
  //   { lat: 25.49936, lng: 81.86926 },
  //   { lat: 25.49967, lng: 81.86931 },
  //   { lat: 25.50042, lng: 81.86942 },
  //   { lat: 25.50102, lng: 81.86954 },
  //   { lat: 25.50105, lng: 81.86954 },
  //   { lat: 25.5015, lng: 81.86964 },
  //   { lat: 25.502, lng: 81.86976 },
  //   { lat: 25.50243, lng: 81.86985 },
  //   { lat: 25.50271, lng: 81.86988 },
  //   { lat: 25.50297, lng: 81.86988 },
  //   { lat: 25.50347, lng: 81.87008 },
  //   { lat: 25.50353, lng: 81.8701 },
  //   { lat: 25.50365, lng: 81.87011 },
  //   { lat: 25.50375, lng: 81.87012 },
  // ];
  // coordinates

  useEffect(() => {
    // Animate Legend marker
    animateLegendMarker(coordinates);
  }, []);

  const myFunction = async (obj) => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/model_inference",
        obj
      );
      console.log(res.data);
      setResponse(res.data);
    } catch (e) {
      console.log(e);
    }
    // You can put your code here
  };

  const [location, setLocation] = useState({ lat: 0, long: 0 });

  function animateLegendMarker(coordinates) {
    let index = 0;
    const interval = setInterval(() => {
      const { lat, lng } = coordinates[index];
      let now = new Date();
      const obj = {
        lat: lat,
        long: lng,
        hour: now.getHours(),
        minutes: now.getMinutes(),
        day_of_week: now.getDay(),
      };
      setLocation({ lat: lat, long: lng });
      console.log(obj);
      myFunction(obj);
      index++;
      if (index >= coordinates.length) {
        clearInterval(interval);
      }
    }, 10000);
  }

  const [Response, setResponse] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const apiUrl = `http://api.weatherapi.com/v1/current.json?key=52cd588ad7ed4eddb4c71127242004&q=25.50375,81.87012&aqi=no`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Weather data not found");
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setWeatherData(null);
      }
    };

    fetchWeatherData();
  }, [apiKey, latitude, longitude]);

  return (
    <div className="p-4 w-[100vh] weather-card bg-blue-100 rounded-2xl flex justify-center items-center">
      {Response ? (
        <div className="text-center">
          <h2>
            Severity
            {(Response.float_value / 3) * 100}, {location.lat},{" "}
            {weatherData.location.country}
          </h2>
          <p>{weatherData.current.condition.text}</p>
          <img
            src={`https:${weatherData.current.condition.icon}`}
            alt={weatherData.current.condition.text}
          />
          <p>Temperature: {weatherData.current.temp_c}°C</p>
          <p>Humidity: {weatherData.current.humidity}%</p>
          <p>Wind Speed: {weatherData.current.wind_kph} km/h</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default ResponseCard;

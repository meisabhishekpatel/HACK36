import React, { useState, useEffect } from "react";

const WeatherCard = ({ apiKey, latitude, longitude }) => {
  const [weatherData, setWeatherData] = useState(null);

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
    <div className="mb-8 p-8 w-full max-w-md mx-auto bg-blue-100 rounded-2xl text-center">
      {weatherData ? (
        <>
          <h2 className="text-xl font-bold mb-2">
            {weatherData.location.name}, {weatherData.location.region},{" "}
            {weatherData.location.country}
          </h2>
          <p className="mb-4">{weatherData.current.condition.text}</p>
          <img
            src={`https:${weatherData.current.condition.icon}`}
            alt={weatherData.current.condition.text}
            className="w-16 h-16 mb-4 mx-auto"
          />
          <p className="mb-2">Temperature: {weatherData.current.temp_c}°C</p>
          <p className="mb-2">Humidity: {weatherData.current.humidity}%</p>
          <p>Wind Speed: {weatherData.current.wind_kph} km/h</p>
        </>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default WeatherCard;

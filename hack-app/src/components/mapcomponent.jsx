import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import axios from "axios";

const MapComponent = () => {
  const mapRef = useRef(null);
  const legendMarkerRef = useRef(null);

  const coordinates = [
    { lat: 25.50375, lng: 81.87012 },
    { lat: 25.49217, lng: 81.86762 },
    { lat: 25.49212, lng: 81.86776 },
    { lat: 25.49208, lng: 81.86825 },
    { lat: 25.49205, lng: 81.86842 },
    { lat: 25.49159, lng: 81.86843 },
    { lat: 25.49115, lng: 81.86843 },
    { lat: 25.49115, lng: 81.86794 },
    { lat: 25.49115, lng: 81.86706 },
    { lat: 25.49116, lng: 81.86692 },
    { lat: 25.49116, lng: 81.86683 },
    { lat: 25.49147, lng: 81.86683 },
    { lat: 25.49165, lng: 81.86683 },
    { lat: 25.49171, lng: 81.86684 },
    { lat: 25.49172, lng: 81.86685 },
    { lat: 25.49182, lng: 81.86685 },
    { lat: 25.49193, lng: 81.86691 },
    { lat: 25.49224, lng: 81.86713 },
    { lat: 25.49255, lng: 81.86737 },
    { lat: 25.49257, lng: 81.86738 },
    { lat: 25.4929, lng: 81.86765 },
    { lat: 25.49361, lng: 81.86824 },
    { lat: 25.49363, lng: 81.86826 },
    { lat: 25.49447, lng: 81.86897 },
    { lat: 25.49488, lng: 81.86931 },
    { lat: 25.49495, lng: 81.86936 },
    { lat: 25.49508, lng: 81.86946 },
    { lat: 25.4951, lng: 81.86948 },
    { lat: 25.49512, lng: 81.86951 },
    { lat: 25.49513, lng: 81.86952 },
    { lat: 25.49513, lng: 81.86953 },
    { lat: 25.49514, lng: 81.86954 },
    { lat: 25.49543, lng: 81.86971 },
    { lat: 25.49567, lng: 81.86987 },
    { lat: 25.49583, lng: 81.86995 },
    { lat: 25.49611, lng: 81.86966 },
    { lat: 25.49621, lng: 81.86955 },
    { lat: 25.49632, lng: 81.86939 },
    { lat: 25.49639, lng: 81.86927 },
    { lat: 25.49643, lng: 81.8692 },
    { lat: 25.49646, lng: 81.86912 },
    { lat: 25.49648, lng: 81.86905 },
    { lat: 25.49648, lng: 81.86896 },
    { lat: 25.49648, lng: 81.86886 },
    { lat: 25.49667, lng: 81.86888 },
    { lat: 25.4967, lng: 81.86889 },
    { lat: 25.49715, lng: 81.86894 },
    { lat: 25.49779, lng: 81.86903 },
    { lat: 25.498, lng: 81.86907 },
    { lat: 25.49851, lng: 81.86915 },
    { lat: 25.49889, lng: 81.8692 },
    { lat: 25.49936, lng: 81.86926 },
    { lat: 25.49967, lng: 81.86931 },
    { lat: 25.50042, lng: 81.86942 },
    { lat: 25.50102, lng: 81.86954 },
    { lat: 25.50105, lng: 81.86954 },
    { lat: 25.5015, lng: 81.86964 },
    { lat: 25.502, lng: 81.86976 },
    { lat: 25.50243, lng: 81.86985 },
    { lat: 25.50271, lng: 81.86988 },
    { lat: 25.50297, lng: 81.86988 },
    { lat: 25.50347, lng: 81.87008 },
    { lat: 25.50353, lng: 81.8701 },
    { lat: 25.50365, lng: 81.87011 },
    { lat: 25.50375, lng: 81.87012 },
  ];

  useEffect(() => {
    if (!mapRef.current) {
      // Initialize Leaflet map
      mapRef.current = L.map("map").setView([25.492062, 81.867989], 13);

      // Add tile layer (you may need to replace the URL with your own)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(mapRef.current);

      // Define Legend marker
      legendMarkerRef.current = L.marker([0, 0], {
        icon: L.divIcon({ className: "legend-marker", html: "Legend" }),
      }).addTo(mapRef.current);

      // Animate Legend marker
      animateLegendMarker(coordinates);
    }
  }, []);

  const [userLocation, setUserLocation] = useState(null);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const myFunction = async () => {
    let now = new Date();
    const obj = {
      lat: userLocation.lat,
      long: userLocation.lng,
      hour: now.getHours(),
      minutes: now.getMinutes(),
      day_of_week: now.getDay(),
    };
    // console.log(obj);
    const res = await axios.post("http://127.0.0.1:5000/model_inference", obj);
    console.log(res.data);
    // You can put your code here
  };
  useEffect(() => {
    // Define your function to be called every 5 seconds

    // Call myFunction initially when the component mounts
    myFunction();

    // Call myFunction every 5 seconds using setInterval
    const intervalId = setInterval(myFunction, 50000);

    // Clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [userLocation]);

  // Animate Legend marker with coordinates
  function animateLegendMarker(coordinates) {
    let index = 0;
    const interval = setInterval(() => {
      const { lat, lng } = coordinates[index];
      legendMarkerRef.current.setLatLng([lat, lng]);
      mapRef.current.panTo([lat, lng]);
      setUserLocation({ lat: lat, lng: lng });
      // console.log(userLocation);
      index++;
      if (index >= coordinates.length) {
        clearInterval(interval);
      }
    }, 1000); // Change animation speed as needed
  }

  return <div id="map" style={{ height: "800px" }}></div>;
};

export default MapComponent;

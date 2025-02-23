"use client";

import { useState } from "react";
import axios from "axios";
import { BsSearch } from "react-icons/bs";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;

  const fetchWeather = async (e) => {
    e.preventDefault();

    if (!city.trim()) {
      alert("Please enter a city name!");
      return;
    }

    setLoading(true);

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      const res = await axios.get(url);
      setWeather(res.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("Failed to fetch weather data. Please try again.");
    }

    setLoading(false);
    setCity("");
  };

  return (
    <div className="bg-weather min-h-screen flex flex-col items-center">
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-md mt-10 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-6 shadow-lg text-center"
      >
        <h1 className="text-4xl font-extrabold text-white mb-4 drop-shadow-md">
          
        </h1>

        {/* Search Input */}
        <form
          onSubmit={fetchWeather}
          className="flex items-center bg-white text-black rounded-lg overflow-hidden shadow-md"
        >
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="px-4 py-3 w-full text-lg outline-none border-none"
          />
          <button type="submit" className="bg-blue-500 p-3 mr-1 text-white">
            <BsSearch size={22} />
          </button>
        </form>

        {/* Loading Animation */}
        {loading && (
          <motion.p
            className="text-white mt-4 animate-pulse text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            Loading...
          </motion.p>
        )}

        {/* Weather Data */}
        {weather && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mt-6 text-white"
          >
            <h2 className="text-3xl font-bold tracking-wide">
              📍 {weather.name}, {weather.sys.country}
            </h2>
            <p className="text-4xl font-bold text-blue-300 mt-2">
              🌡️ {weather.main.temp}°C
            </p>
            <p className="text-lg italic opacity-80">
              🤔 Feels Like: {weather.main.feels_like}°C
            </p>

            {/* Grid Layout for Extra Info */}
            <div className="grid grid-cols-2 gap-4 mt-4 text-lg">
              <p>💨 Wind: <span className="font-semibold">{weather.wind.speed} m/s</span></p>
              <p>🌍 Humidity: <span className="font-semibold">{weather.main.humidity}%</span></p>
              <p>📏 Pressure: <span className="font-semibold">{weather.main.pressure} hPa</span></p>
              <p>🔆 Visibility: <span className="font-semibold">{weather.visibility} meters</span></p>
            </div>

            {/* Sunrise & Sunset */}
            <div className="mt-4 flex justify-center gap-6 text-lg">
              <p>🌅 Sunrise: <span className="font-semibold">{new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</span></p>
              <p>🌇 Sunset: <span className="font-semibold">{new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</span></p>
            </div>

            {/* Weather Condition */}
            <p className="mt-4 text-lg font-semibold capitalize">
              🌤️ Condition: <span className="text-xl font-bold text-yellow-300">{weather.weather[0].description}</span>
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

import { useState } from "react";
import api from "./services/api";

// Components
import { SearchBar } from "./components/SearchBar";
import { WeatherCard } from "./components/WeatherCard";

export default function App() {
  const apiKey = import.meta.env.VITE_API_KEY;

  const [location, setLocation] = useState("");
  const [weatherForecast, setWeatherForecast] = useState(null);

  const handleChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      api
        .get(`/weather?q=${location}&appid=${apiKey}&lang=pt_br&units=metric`)
        .then((response) => {
          setWeatherForecast(response.data);
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const determineEmoji = () => {
    switch (true) {
      case temp > 25:
        return "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Hot%20Face.png"
      case temp < 15:
        return "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Cold%20Face.png"
      default:
        return "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Smiling%20Face%20with%20Sunglasses.png"
    }
  }

  return (
      <div 
        className={ `flex flex-col justify-center items-center h-screen space-y-8 bg-purple-500
          ${weatherForecast && 
            (weatherForecast?.main.temp > 25 
            ? "bg-hot transition duration-500 ease-in-out" 
            : weatherForecast?.main.temp < 15
            ? "bg-cold transition duration-500 ease-in-out"
            : "bg-warm transition duration-500 ease-in-out"
          )}`}
      >
        <h1 className="flex font-mono font-bold text-5xl text-white align-center justify-center">
          Weather App 
          <img className="ml-4" src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Sun%20Behind%20Cloud.png" alt="Sun Behind Cloud" width="60" height="60"/>
        </h1>
        {weatherForecast && (  
          <WeatherCard
            city={weatherForecast?.name}
            temp={weatherForecast?.main.temp}
            min={weatherForecast?.main.temp_min}
            max={weatherForecast?.main.temp_max}
            sensation={weatherForecast?.main.feels_like}
            wind={weatherForecast?.wind.speed}
            humidity={weatherForecast?.main.humidity}
          />
          
        )}         
        <div>
          <SearchBar
            id="search"
            className="border rounded-md pl-4 pr-3 py-2 w-full focus:outline-none"
            placeholder="Pesquisar..."
            value={location}
            onChange={handleChange}
            onKeyPress={handleSearch}
            label="Pesquisar"
          />
          {location && (
          <div className="pt-4">
            <p className="text-white text-xs font-medium">
              Resultado das pesquisas...
            </p>
          </div>
          )}
        </div>
      </div>
  );
}

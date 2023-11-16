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

  const handleTemp = (temp) => {
    const hot = temp > 25;
    const cold = temp < 15;
    const warm = !hot && !cold;
    if (hot) {
      return + temp + "°C " + "🥵";
    }
    if (cold) {
      return temp + "°C " + "🥶";
    }
    if (warm) {
      return  temp + "°C " + "😎";
    }
  }

  return (
      <div 
        className={ `flex flex-col justify-center items-center h-screen space-y-8 
          ${weatherForecast && 
            (weatherForecast?.main.temp > 25 
            ? "bg-gradient-to-b from-hot to-warm transition-all duration-500 ease-in-out" 
            : weatherForecast?.main.temp < 15
            ? "bg-gradient-to-b from-cold to-blue-100 transition-all duration-500 ease-in-out"
            : "bg-gradient-to-b from-warm to-yellow-500 transition-all duration-500 ease-in-out"
          )}`}
      >
        <h1 className="font-mono font-bold text-5xl text-white">
          Previsão do tempo
        </h1>
          <WeatherCard
            city={weatherForecast?.name}
            temp={handleTemp(weatherForecast?.main.temp)}
            min={weatherForecast?.main.temp_min}
            max={weatherForecast?.main.temp_max}
            sensation={weatherForecast?.main.feels_like}
            wind={weatherForecast?.wind.speed}
            humidity={weatherForecast?.main.humidity}
          />
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
          <div>
            <p className="text-white text-sm font-semibold">
              Resultado das pesquisas...
            </p>
          </div>
        </div>
      </div>
  );
}

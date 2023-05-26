import { useEffect, useState } from "react";
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

  return (
    <main className="flex flex-col justify-center items-center h-screen bg-gradient-to-b from-orange-500 to-yellow-300">
      <div className="space-y-12">
        <h1 className="font-mono font-bold text-5xl text-white">
          Previsão do tempo
        </h1>
        <WeatherCard
          city={weatherForecast?.name}
          temp={`${weatherForecast?.main.temp}°C ${weatherForecast?.weather[0].description}`}
          min={weatherForecast?.main.temp_min}
          max={weatherForecast?.main.temp_max}
          sensation={weatherForecast?.main.feels_like}
          wind={weatherForecast?.wind.speed}
          humidity={weatherForecast?.main.humidity}
        />
        <SearchBar
          id="search"
          className="border rounded-md pl-4 pr-3 py-2 w-full focus:outline-none"
          placeholder="Insira aqui o nome da cidade"
          value={location}
          onChange={handleChange}
          onKeyPress={handleSearch}
          label="Pesquisar"
        />
        <hr />
      </div>
    </main>
  );
}

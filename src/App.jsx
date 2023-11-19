import React, { useEffect, useState } from "react";
import api from "./services/api";
import "react-toastify/dist/ReactToastify.css";

// Components
import { SearchBar } from "./components/SearchBar";
import { WeatherCard } from "./components/WeatherCard";
import { toast } from 'react-toastify';
import { FaGithub } from "react-icons/fa";

// Hooks
import { useWeather } from "./hooks/useWeather";
import { useGeolocation } from "./hooks/useGeolocation";


export default function App() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const currentLocation = useGeolocation();
  const weatherForecast = useWeather(currentLocation.coordinate);
  const [weather, setWeather] = useState(null);

  const handleWeather = async ({ lat, lon }) => {
      await api
        .get(`/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=pt_br&units=metric`)
        .then((response) => {
          setWeather(response.data);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Local não encontrado(a)", { position: toast.POSITION.TOP_CENTER });
        });
  }

  useEffect(() => {
    // Verifique se a localização atual está disponível e atualize o estado de acordo
    if (currentLocation.loaded && currentLocation.coordinate) {
      handleWeather({ lat: currentLocation.coordinate.lat, lon: currentLocation.coordinate.lon });
    }
  }, [currentLocation]);

  return (
    <div 
    className={ `flex flex-col justify-center items-center h-screen font-lexend overflow-hidden
      ${weatherForecast && 
          (weatherForecast?.main.temp > 25 
            ? "bg-red-500 transition duration-500 ease-in-out" 
            : weatherForecast?.main.temp < 15
            ? "bg-blue-500 transition duration-500 ease-in-out" 
            : "bg-orange-500 transition duration-500 ease-in-out" ) || "bg-purple-500 transition duration-500 ease-in-out" }`
    }
    >
    <div className="space-y-8">
    <h1 className="flex font-bold text-3xl sm:text-3xl md:text-4xl lg:text-5xl text-white align-center justify-center">
    Termometro Global
    <img className="ml-4 w-8 h- sm:w-10 sm:h-10 lg:w-12 lg:h-12" src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Sun%20Behind%20Cloud.png" alt="Sun Behind Cloud" width="60" height="60"/>
    </h1>
    {weatherForecast && (  
      <WeatherCard weather={weatherForecast} />
    )}         
    <SearchBar onSearch={handleWeather}/>
    </div>
    <footer className="flex absolute bottom-8 text-white font-regular space-x-1 items-center">
    Feito com
    <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Red%20Heart.png" alt="Red Heart" width="25" height="25" />
    por
    <a target="blank" href="https://github.com/barbosa885/weather-forecast" className="flex items-center underline text-black font-bold">
    <FaGithub />
    <span>Barbosa885</span>
    </a>
    </footer>
    </div>
  );
}

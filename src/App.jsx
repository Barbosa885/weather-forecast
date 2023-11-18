import React, { useEffect, useState } from "react";
import api from "./services/api";
import "react-toastify/dist/ReactToastify.css";

// Components
import { SearchBar } from "./components/SearchBar";
import { WeatherCard } from "./components/WeatherCard";
import { useGeolocation } from "./hooks/useGeolocation";
import { toast, ToastContainer } from 'react-toastify';
import { FaGithub } from "react-icons/fa";

export default function App() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [location, setLocation] = useState("");
  const [weatherForecast, setWeatherForecast] = useState(null);
  const currentLocation = useGeolocation();

  const handleChange = (event) => {
    setLocation(event.target.value);
  };

  async function handleSearch(event){
    // const query = event.target.value;

    // setLocation(query)

    // if (query.length >= 1) {
    //   api
    //     .get(`/find?q=${query}&appid=${apiKey}&lang=pt_br&units=metric`)
    //     .then((response) => {
    //       setSuggetions(response.data.list);
    //       console.log(response.data.list);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       toast.err(`${query} não encontrado`, { position: toast.POSITION.TOP_CENTER });
    //       setSuggetions([]);
    //     });
    // } else {
    //   setSuggetions([]);
    // }

    if (event.key === "Enter" || event.type === "click") {
      await api
            .get(`/weather?q=${location}&appid=${apiKey}&lang=pt_br&units=metric`)
            .then((response) => {
              setWeatherForecast(response.data);
              console.log(response.data)
            })
            .catch((err) => {
              console.log(err);
              toast.error("Local não encontrado(a)", { position: toast.POSITION.TOP_CENTER });
            });
    }
  };

  useEffect(() => {
  // Check if the current location is available and update the state accordingly
  if (currentLocation.loaded && currentLocation.coordinates) {
      api
        .get(`/weather?lat=${currentLocation.coordinates.lat}&lon=${currentLocation.coordinates.long}&appid=${apiKey}&lang=pt_br&units=metric`)
        .then((response) => {
          setWeatherForecast(response.data);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Local não encontrado(a)", { position: toast.POSITION.TOP_CENTER });
        });
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
        <ToastContainer />
        <div className="space-y-8">
          <h1 className="flex font-bold text-3xl sm:text-3xl md:text-4xl lg:text-5xl text-white align-center justify-center">
            Termometro Global
            <img className="ml-4 w-8 h- sm:w-10 sm:h-10 lg:w-12 lg:h-12" src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Sun%20Behind%20Cloud.png" alt="Sun Behind Cloud" width="60" height="60"/>
          </h1>
          {weatherForecast && (  
            <WeatherCard
              city={weatherForecast?.name}
              flag={weatherForecast?.sys.country}
              temp={weatherForecast?.main.temp}
              min={weatherForecast?.main.temp_min}
              max={weatherForecast?.main.temp_max}
              sensation={weatherForecast?.main.feels_like}
              wind={weatherForecast?.wind.speed}
              humidity={weatherForecast?.main.humidity}
            />
          )}         
          <SearchBar
            value={location}
            onChange={handleChange}
            onKeyPress={handleSearch}
            onClick={handleSearch}
          />
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

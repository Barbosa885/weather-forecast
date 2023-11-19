import { useState, useEffect } from 'react';
import api from "../services/api";
import { toast } from 'react-toastify';
import { useGeolocation } from './useGeolocation';

export const useWeather = (location) => {
  const [weatherForecast, setWeatherForecast] = useState(null);
  const apiKey = import.meta.env.VITE_API_KEY;
  const currentLocation = useGeolocation();


  useEffect(() => {
    if (currentLocation.loaded && currentLocation.coordinate) {
      api
        .get(`/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}&lang=pt_br&units=metric`)
        .then((response) => {
          setWeatherForecast(response.data);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Local não encontrado(a)", { position: toast.POSITION.TOP_CENTER });
        });
    }
  }, [location]);

  return weatherForecast;
}

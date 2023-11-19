import React, { useState } from "react";
import { GoSearch } from "react-icons/go";
import api from "../services/api";

export const SearchBar = ({ onSearch, ...props }) => {
  const [location, setLocation] = useState("");
  const apiKey = import.meta.env.VITE_API_KEY

  function debounce(callback, delay) {
    let timeout;
    return function()
    {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        callback();
      }
      ), delay};
  }

  const handleChange = (event) => {
    setLocation(event.target.value);
  };
  
  const handleLocation = async (e) => {
    if (e.key === "Enter" || e.type === "click") {
      await api
        .get(`/geo/1.0/direct?q=${location}&limit=3&appid=${apiKey}`)
        .then((response) => {
          const locations = response.data.map((location) => ({
            lat: location.lat,
            lon: location.lon,
          }));
          setLocation(locations);
          onSearch(locations[0]);
          return locations
        })
        .catch((err) => {
          console.log(err);
          toast.error("Local não encontrado(a)", { position: toast.POSITION.TOP_CENTER });
        });
    }
  }

    return (
      <div className="relative w-full">
        <input 
          id="search"
          type="text" 
          placeholder="Digite o nome da cidade..."
          onChange={handleChange} 
          value={location} 
          onKeyDown={handleLocation}
          className="border rounded-md pl-4 pr-3 py-2 focus:outline-none w-full" 
          {...props}
        />
        <div className="absolute top-0 right-0 flex items-center h-full px-3">
          <GoSearch onClick={handleLocation} className="cursor-pointer"/>
        </div>
      </div>
    );
  }

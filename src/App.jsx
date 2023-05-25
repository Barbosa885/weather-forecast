import { useEffect, useState } from "react";
import api from "./services/api";

// Components
import { SearchBar } from "./components/SearchBar";
import { WeatherCard } from "./components/WeatherCard";

export default function App() {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    api;
  }, [value]);

  return (
    <main className="flex flex-col items-center h-screen bg-gradient-to-b from-orange-500 to-yellow-300">
      <div className="space-y-12">
        <h1 className="font-mono font-bold text-5xl text-white">
          Previsão do tempo
        </h1>
        <WeatherCard
          city="Niterói, RJ - Brasil"
          temp="20C Nublado"
          min="16"
          max="15"
          sensation="19C"
          wind="18km/h"
          humidity="89%"
        />
        <SearchBar
          id="search"
          className="border rounded-md pl-4 pr-3 py-2 w-full focus:outline-none"
          placeholder="Insira aqui o nome da cidade"
          onChange={handleChange}
          label="Pesquisar"
        />
        <hr />
      </div>
    </main>
  );
}

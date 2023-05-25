import { useEffect, useState } from "react";
import api from "./services/api";

// Components
import { SearchBar } from "./components/SearchBar";

export default function App() {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    api;
  }, [value]);

  return (
    <body className="flex flex-col justify-center items-center h-screen bg-gradient-to-b from-orange-500 to-yellow-300">
      <div className="space-y-12">
        <h1 className="font-mono font-bold text-5xl text-white">
          Previsão do tempo
        </h1>
        <SearchBar
          id="search"
          className="border rounded-md pl-4 pr-3 py-2 w-full focus:outline-none"
          placeholder="Insira aqui o nome da cidade"
          onChange={handleChange}
          label="Pesquisar"
        />
        <hr />
      </div>
      <div className="pt-4">
        <h3 className="text-white text-3xl font-medium">Capitais</h3>
        <div className="flex space-x-2 text-zinc-700">
          <span className="font-light">Min</span>
          <span className="font-light">Máx</span>
        </div>
      </div>
    </body>
  );
}

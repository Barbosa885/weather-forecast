import { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import api from "./services/api";

export default function App() {
  const [value, setValue] = useState();

  useEffect(() => {
    api.get();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-b from-orange-500 to-yellow-300">
      <div className="space-y-12">
        <h1 className="font-mono font-bold text-5xl text-white">
          Previsão do tempo
        </h1>
        <div className="flex items-center">
          <input
            className="placeholder:italic bg-white border border-slate-300 w-full p-2 pl-8"
            placeholder="Insira aqui o nome da cidade..."
          />
          <GoSearch className="text-slate-700 absolute ml-3" />
        </div>
        <hr />
      </div>
      <div className="flex flex-col pt-4">
        <h3 className="text-white text-3xl font-medium">Capitais</h3>
        <div className="flex space-x-2">
          <span className="font-light">Min</span>
          <span className="font-light">Máx</span>
        </div>
      </div>
    </div>
  );
}

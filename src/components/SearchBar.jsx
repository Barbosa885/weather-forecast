import React, { useState } from "react";
import { GoSearch } from "react-icons/go";

export function SearchBar({ onClick, ...props }) {
  const [location, setLocation] = useState("");
  
  const handleChange = (event) => {
    setLocation(event.target.value);
  };

  return (
    <div className="relative w-full">
      <input 
        id="search"
        type="text" 
        placeholder="Digite o nome da cidade..."
        onChange={handleChange} 
        value={location} 
        className="border rounded-md pl-4 pr-3 py-2 focus:outline-none w-full" 
        {...props}
      />
      <div className="absolute top-0 right-0 flex items-center h-full px-3">
        <GoSearch onClick={onClick} className="cursor-pointer"/>
      </div>
    </div>
  );
}
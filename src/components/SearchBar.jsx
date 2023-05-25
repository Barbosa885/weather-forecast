import React from "react";
import { GoSearch } from "react-icons/go";

export function SearchBar({ ...props }) {
  return (
    <div className="relative">
      <input type="text" {...props} />
      <div className="absolute top-0 right-0 flex items-center h-full px-3">
        <GoSearch className="text-gray-400 h-5 w-5" />
      </div>
    </div>
  );
}

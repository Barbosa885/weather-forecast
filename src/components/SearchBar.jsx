import React from "react";
import { GoSearch } from "react-icons/go";

export function SearchBar({ ...props }) {
  return (
    <div className="relative w-full">
      <input type="text" {...props} />
      <div className="absolute top-0 right-0 flex items-center h-full px-3">
        <GoSearch />
      </div>
    </div>
  );
}

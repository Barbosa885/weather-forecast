import React from "react";

export function WeatherCard(props) {
  return (
    <div className="bg-orange-50 p-4 rounded-lg shadow-md space-y-4 flex flex-col items-center">
      <p>{props.city}</p>
      <h1 className="text-5xl font-bold">{props.temp}</h1>
      <div className="inline-grid grid-cols-2 gap-4">
        <p>
          {props.min} {props.max}
        </p>
        <p className="font-light">
          Sensação <span className="font-normal">{props.sensation}</span>
        </p>
        <p className="font-light">
          Vento <span className="font-normal">{props.wind}</span>
        </p>
        <p className="font-light">
          Humidade <span className="font-normal">{props.humidity}</span>
        </p>
      </div>
      <div className="pt-2 border-t-2 border-orange-400">
        <div className="flex space-x-8">
          <div>
            <h1 className="font-medium">Terça</h1>
            <h1 className="text-orange-600">16 15</h1>
          </div>
          <div>
            <h1 className="font-medium">Terça</h1>
            <h1 className="text-orange-600">16 15</h1>
          </div>
          <div>
            <h1 className="font-medium">Terça</h1>
            <h1 className="text-orange-600">16 15</h1>
          </div>
          <div>
            <h1 className="font-medium">Terça</h1>
            <h1 className="text-orange-600">16 15</h1>
          </div>
          <div>
            <h1 className="font-medium">Terça</h1>
            <h1 className="text-orange-600">16 15</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

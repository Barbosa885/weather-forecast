import React from "react";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";

export function WeatherCard(props) {

  const determineEmoji = () => {
    switch (true) {
      case props.temp > 25:
        return "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Hot%20Face.png"
      case props.temp < 15:
        return "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Cold%20Face.png"
      default:
        return "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Smiling%20Face%20with%20Sunglasses.png"
    }
  }

  return (
    <div className="bg-orange-50 p-4 rounded-lg shadow-md space-y-4 flex flex-col items-center">
      <p>{props.city}</p>
      <h1 className="flex text-6xl font-bold items-center">
        {props.temp}°C 
        <img src={determineEmoji()} alt="Emoji" className="w-16 h-16 ml-4"/>
      </h1>
      <div className="inline-grid grid-cols-2 gap-4">
        <div className="flex items-center justify-center">
          <BsArrowUp className="text-orange-600" />
          <p>{props.min}°</p>
          <BsArrowDown className="text-orange-600" />
          <p>{props.max}°</p>
        </div>
        <p className="font-light">
          Sensação <span className="font-normal">{props.sensation}°C</span>
        </p>
        <p className="font-light">
          Vento <span className="font-normal">{props.wind}m/s</span>
        </p>
        <p className="font-light">
          Humidade <span className="font-normal">{props.humidity}%</span>
        </p>
      </div>
      <div className="pt-2 border-t-2 border-orange-400">
        <div className="flex space-x-8">
          <div>
            <h1 className="font-medium">Seg</h1>
            <h1 className="text-orange-600">16 15</h1>
          </div>
          <div>
            <h1 className="font-medium">Ter</h1>
            <h1 className="text-orange-600">16 15</h1>
          </div>
          <div>
            <h1 className="font-medium">Qua</h1>
            <h1 className="text-orange-600">16 15</h1>
          </div>
          <div>
            <h1 className="font-medium">Qui</h1>
            <h1 className="text-orange-600">16 15</h1>
          </div>
          <div>
            <h1 className="font-medium">Sex</h1>
            <h1 className="text-orange-600">16 15</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { FunctionComponent, useState } from "react";
import { getWeather } from "../services/WeatherService";
import {CurrentWeather} from "../interfaces/weatherInterface";

type WeatherProps = {
  cityName: string;
};

export const WeatherCard: FunctionComponent<WeatherProps> = ({ cityName }) => {
 const [weather,setWeather] = useState<CurrentWeather | undefined>(undefined)
  async function fetchWeather() {
    const currentWeather = await getWeather("Amsterdam");
    setWeather(currentWeather)
    console.log(currentWeather);
  }
  

  return <div>
      {weather ? weather.name: "no city selected"} 
      <button onClick={fetchWeather}>Click to see Amsterdam</button></div>;
};

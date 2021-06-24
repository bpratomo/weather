import React, { FC, FunctionComponent, Props, useState } from "react";
import { ICurrentWeather } from "../interfaces/weatherInterface";
import { getWeatherIconLink } from "../services/WeatherService";
import Button from "@material-ui/core/Button";

type WeatherProps = {
  weather: ICurrentWeather | undefined;
};

export const WeatherCard: FunctionComponent<WeatherProps | undefined> = ({
  weather,
}) => {
  const iconType = weather? weather.weather[0].icon : "";
  const [iconLink, setIconLink] = useState(
    weather ? getWeatherIconLink(iconType) : ""
  );

  return (
    <div>
      <img src={iconLink} alt="" />
      <h1>{weather?.name}</h1>
      
    </div>
  );
};

import React, { FunctionComponent, useState } from "react";
import { getWeatherIconLink } from "../services/WeatherService";
import { WeatherProps } from "../interfaces/WeatherProps";
// import { WeatherCards } from "./WeatherCards/WeatherCards";
import { WeatherCardTemplate } from "./WeatherCards/WeatherCardTemplate";
import { WindCard } from "./WeatherCards/WindCard";
import { PressureCard } from "./WeatherCards/PressureCard";
import { HumidityCard } from "./WeatherCards/HumidityCard";
import { TemperatureCard } from "./WeatherCards/TemperatureCard";

export const WeatherDashboard: FunctionComponent<WeatherProps> = ({
  weather,
}) => {
  return (
    <div className="weatherCard__container">
      <WeatherDashboardMain weather={weather} />
      <WeatherCards weather={weather} />
    </div>
  );
};

const WeatherDashboardMain: FunctionComponent<WeatherProps> = ({ weather }) => {
  const iconStyle = {
    display: "flex",
  };

  const descStyle = {
    fontSize: "xx-large",
    display: "flex",
    flexDirection: "column" as "column",
    justifyContent: "center",
    marginLeft: "-10px",
  };

  const cityNameStyle = {
    fontSize: "xxx-large",
    marginBottom: "1em",
    marginTop: "-1em",
    textAlign: "center" as "center",
  };
  const iconType = weather?.weather[0].icon;
  const [iconLink, setIconLink] = useState(
    iconType ? getWeatherIconLink(iconType) : ""
  );
  return (
    <div>
      <div id="weatherCard__icon" style={iconStyle}>
        <img src={iconLink} alt="" />
        <div id="weatherCard__description" style={descStyle}>
          <div>{weather?.weather[0].main}</div>
          <div id="weatherCard__subDescription">
            {weather?.weather[0].description}
          </div>
        </div>
      </div>
      <div id="weatherCard__city" style={cityNameStyle}>
        {weather?.name}, {weather?.sys.country}
      </div>
    </div>
  );
};

export const WeatherCards: FunctionComponent<WeatherProps> = ({ weather }) => {
  const seedCards = ["temperature", "wind", "pressure", "humidity"];
  const weatherCardsContainerStyle = {
    display: "flex",
    flexDirection: "row" as "row",
    flexWrap: "wrap" as "wrap",
    justifyContent: "center",
  };
  return (
    <div
      className="weatherCard__info__container"
      style={weatherCardsContainerStyle}
    >
      {seedCards.map((element) => {
        switch (element) {
          case "temperature":
            return <TemperatureCard weather={weather} />;
          case "wind":
            return <WindCard weather={weather} />;
          case "pressure":
            return <PressureCard weather={weather} />;
          case "humidity":
            return <HumidityCard weather={weather} />;

          default:
            return <WindCard weather={weather} />;
        }
      })}
    </div>
  );
};

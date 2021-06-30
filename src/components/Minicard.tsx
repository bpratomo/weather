

import { getWeatherIconLink } from "../services/WeatherService";
import { ICurrentWeather } from "../interfaces/weatherInterface";
import { FunctionComponent } from "react";

type MinicardProps = {
    weather: ICurrentWeather;
    setWeather: (weather: ICurrentWeather) => void;
    toggleVisibility: () => void;
  };
  
export const Minicard: FunctionComponent<MinicardProps> = ({
    weather,
    setWeather,
    toggleVisibility
  }) => {
    
    const iconType = weather?.weather[0].icon;
    const iconLink = iconType ? getWeatherIconLink(iconType) : "";
  
    return (
      <article
        style={minicardStyle}
        onClick={() => {
          setWeather(weather);
          toggleVisibility()
          
        }}
      >
        <div style={iconStyle}>
          <img src={iconLink} alt="" />
        </div>
  
        <div style={textContentStyle}>
          <div>
            {weather?.name}, {weather?.sys.country}
          </div>
          <div>{weather?.main.temp.toString()}°C</div>
          <div>{weather?.weather[0].main}</div>
        </div>
      </article>
    );
  };




//STYLES
  const minicardStyle = {
    backgroundColor: "#b83b5e",
    border: "solid 1px black",
    width: "100%",
    minHeight: "130px",
    height: "200px",
    borderRadius: "30px",
    padding: "1em",
    boxShadow: "5px 5px black",
    marginRight: "8px",
    marginBottom: "8px",
    boxSizing: "border-box" as "border-box",
    display: "flex",
    alignItems: "center",
    cursor:"pointer"
  };

  const iconStyle = {
    maxWidth: "35%",
    display: "flex",
    flexDirection: "column" as "column",
  };

  const textContentStyle = {
    display: "flex",
    flexDirection: "column" as "column",
    fontSize: "x-large",
  };
  
  
import { getWeatherIconLink } from "../services/WeatherService";
import { ICurrentWeather } from "../interfaces/weatherInterface";
import { FunctionComponent, SyntheticEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

type MinicardProps = {
  weather: ICurrentWeather;
  setWeather: (weather: ICurrentWeather) => void;
  toggleVisibility: () => void;
  deleteLocation: (weather: ICurrentWeather) => void;
};

export const Minicard: FunctionComponent<MinicardProps> = ({
  weather,
  setWeather,
  toggleVisibility,
  deleteLocation
}) => {

  function handleDelete(e:SyntheticEvent){
    deleteLocation(weather)
    e.stopPropagation()

  }
  const iconType = weather?.weather[0].icon;
  const iconLink = iconType ? getWeatherIconLink(iconType) : "";

  return (
    <article
      style={minicardStyle}
      onClick={() => {
        setWeather(weather);
        toggleVisibility();
      }}
    >
      <div style={iconStyle}>
        <img src={iconLink} alt="" />
      </div>
      <button style={deleteButtonStyle} onClick={handleDelete}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
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
  cursor: "pointer",
  position:"relative" as "relative"
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

const deleteButtonStyle={
  position:"absolute" as "absolute",
  top:"10px",
  right:"10px",
  cursor:"pointer",
  background:"none",
  border:"none",
  color:"white",
  fontSize:"x-large",


}

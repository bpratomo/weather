import { FunctionComponent } from "react";
import { getWeatherIconLink } from "../services/WeatherService";
import { ICurrentWeather } from "../interfaces/weatherInterface";

type SidebarProps = {
  weatherList: ICurrentWeather[] | undefined;
  toggleVisibility: () => void;
  setWeather: (weather: ICurrentWeather) => void;
};

type MinicardProps = {
  weather: ICurrentWeather;
  setWeather: (weather: ICurrentWeather) => void;
};

const Minicard: FunctionComponent<MinicardProps> = ({
  weather,
  setWeather,
}) => {
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

  const iconType = weather?.weather[0].icon;
  const iconLink = iconType ? getWeatherIconLink(iconType) : "";

  return (
    <article
      style={minicardStyle}
      onClick={() => {
        setWeather(weather);
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

export const Sidebar: FunctionComponent<SidebarProps> = ({
  weatherList,
  toggleVisibility,
  setWeather,
}) => {
  const overlayStyle = {
    top: "0",
    left: "0",
    minHeight: "100vh",
    width: "100vw",
    zIndex: 2,
    position: "fixed" as "fixed",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  };
  const sidebarStyle = {
    minHeight: "100vh",
    height: "100%",
    width: "100vw",
    minWidth: "300px",
    maxWidth: "400px",
    // overflow: "auto",
    overflowX: "hidden" as "hidden",
    overflowY: "scroll" as "scroll",
    position: "fixed" as "fixed",
    zIndex: 3,
    backgroundColor: "#F08A5D",
    left: "0",
    top: "0",
    display: "flex",
    flexDirection: "column" as "column",
    padding: "20px",
    boxSizing: "border-box" as "border-box",
  };

  return (
    <>
      <div style={overlayStyle} onClick={toggleVisibility}></div>
      <div style={sidebarStyle}>
        <h2>Saved Cities</h2>
        {weatherList ? (
          weatherList.map((weather) => {
            return (
              <Minicard
                weather={weather}
                key={weather.name}
                setWeather={setWeather}
              />
            );
          })
        ) : (
          <h2>No saved cities!</h2>
        )}
      </div>
    </>
  );
};













// STYLES
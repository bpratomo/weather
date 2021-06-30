import { FunctionComponent } from "react";
import { ICurrentWeather } from "../interfaces/weatherInterface";
import { Minicard } from "./Minicard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

type SidebarProps = {
  weatherList: ICurrentWeather[] | undefined;
  toggleVisibility: () => void;
  setWeather: (weather: ICurrentWeather) => void;
};

export const Sidebar: FunctionComponent<SidebarProps> = ({
  weatherList,
  toggleVisibility,
  setWeather,
}) => {
  return (
    <>
      <div style={overlayStyle} onClick={toggleVisibility}></div>
      <div style={sidebarStyle}>
        <div style={headerStyle}>
          <h2>Saved Cities</h2>
          <h2>
            <FontAwesomeIcon
              icon={faTimes}
              onClick={toggleVisibility}
              style={{ cursor: "pointer" }}
            />
          </h2>
        </div>
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

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
};

// STYLES

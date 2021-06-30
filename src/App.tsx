import React, { useEffect, useState } from "react";
import { WeatherDashboard } from "./components/WeatherDashboard";
import { ICurrentWeather } from "./interfaces/weatherInterface";
import {
  getWeather,
  getSavedWeathers,
  saveLocation,
  deleteLocation,
} from "./services/WeatherService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

import "./App.css";
import { WeatherForm, MiniWeatherForm } from "./components/WeatherForm";
import { Sidebar } from "./components/Sidebar";

// STYLES

const toggleButtonStyle = {
  position: "absolute" as "absolute",
  left: "10px",
  top: "10px",
  backgroundColor: "#6A2C70",
  color: "white",
  borderRadius: "10px",
  height: "40px",
  width: "auto",
  border: "none",
  fontSize: "x-large",
  fontFamily: "Itim",
  cursor: "pointer",
};

const searchButtonStyle = {
  backgroundColor: "#6A2C70",
  color: "white",
  borderRadius: "10px",
  height: "40px",
  width: "auto",
  border: "none",
  fontSize: "x-large",
  fontFamily: "Itim",
  cursor: "pointer",
};

const searchBarStyle = {
  position: "absolute" as "absolute",
  right: "10px",
  top: "10px",
  display: "flex",
  justifyContent: "space-around",
};

const homeScreenStyle = {
  marginTop: "80px",
  display: "flex",
  flexDirection: "column" as "column",
  justifyContent: "center",
};

function App() {
  const [weather, setWeather] = useState<ICurrentWeather | undefined>();
  const [savedWeathers, setSavedWeathers] =
    useState<ICurrentWeather[] | undefined>();
  const [sidebarVisible, setSidebarVisibility] = useState<boolean>(false);
  const [searchBarVisible, setSearchBarVisibility] = useState<boolean>(false);

  async function fetchWeather(cityName: string) {
    const currentWeather = await getWeather(cityName);
    if (currentWeather) {
      setWeather(currentWeather);
      console.log(currentWeather);
    }
  }

  function setActiveWeather(weather: ICurrentWeather) {
    toggleVisibility();
    setWeather(weather);
  }

  async function saveWeatherToCollection() {
    if (weather) {
      const fullWeatherList = savedWeathers
        ? savedWeathers.concat(weather)
        : [weather];

      const updatedWeathers = await saveLocation(fullWeatherList);

      setSavedWeathers(updatedWeathers);

      alert("Weather saved!");
    }
  }

  async function deleteWeatherFromCollection(weather: ICurrentWeather) {
    if (savedWeathers) {
      const updatedWeathers = await deleteLocation(weather, savedWeathers);
      setSavedWeathers(updatedWeathers)
    }
  }

  function activateSidebar() {
    setSidebarVisibility(true);
    setSearchBarVisibility(false);
  }

  function activateSearchBar() {
    setSearchBarVisibility(!searchBarVisible);
  }

  function activateDefaultView() {
    setSidebarVisibility(false);
    setSearchBarVisibility(false);
  }

  function toggleVisibility() {}

  useEffect(() => {
    console.log("called");
    getSavedWeathers().then((weathers) => {
      setSavedWeathers(weathers);
    });
  }, []);

  return (
    <div className="App">
      <div className="container">
        <button style={toggleButtonStyle} onClick={activateSidebar}>
          <FontAwesomeIcon icon={faBars} />{" "}
          {searchBarVisible ? <></> : <span>Saved Cities</span>}
        </button>

        <div className="searchBar" style={searchBarStyle}>
          <button style={searchButtonStyle} onClick={activateSearchBar}>
            {searchBarVisible ? (
              <FontAwesomeIcon icon={faTimes} />
            ) : (
              <FontAwesomeIcon icon={faSearch} />
            )}
          </button>
          {searchBarVisible && (
            <MiniWeatherForm
              updateWeather={fetchWeather}
              toggleVisibility={activateDefaultView}
            />
          )}
        </div>

        {sidebarVisible && (
          <Sidebar
            weatherList={savedWeathers}
            toggleVisibility={activateDefaultView}
            setWeather={setActiveWeather}
            deleteLocation={deleteWeatherFromCollection}
          />
        )}

        {weather ? (
          <WeatherDashboard
            weather={weather}
            saveWeather={saveWeatherToCollection}
          />
        ) : (
          <div style={homeScreenStyle}>
            <WeatherForm updateWeather={fetchWeather} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

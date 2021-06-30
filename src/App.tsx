import React, { useEffect, useState } from "react";
import { WeatherDashboard } from "./components/WeatherDashboard";
import { ICurrentWeather } from "./interfaces/weatherInterface";
import { getWeather } from "./services/WeatherService";
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
  display:"flex",
  justifyContent: "space-around"
};

const homeScreenStyle = {
  marginTop:"80px"

}

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

  async function seedWeatherList(
    cityList: string[]
  ): Promise<ICurrentWeather[]> {
    let promiseList = cityList.map((city) => getWeather(city));
    let weatherList = await Promise.all(promiseList);
    return weatherList;
  }

  function activateSidebar(){
    setSidebarVisibility(true);
    setSearchBarVisibility(false)
  }

 function activateSearchBar(){
   setSearchBarVisibility(!searchBarVisible)
 }

  function activateDefaultView(){
    setSidebarVisibility(false);
    setSearchBarVisibility(false)
  }

  function toggleVisibility() {
  }

  useEffect(() => {
    console.log("called");
    seedWeatherList([
      "Amsterdam",
      "London",
      "New York",
      "Jakarta",
      "Bandung",
    ]).then((weathers) => {
      setSavedWeathers(weathers);
    });
  }, []);

  return (
    <div className="App">
      <div className="container">
        <button style={toggleButtonStyle} onClick={activateSidebar}>
          <FontAwesomeIcon icon={faBars} /> {searchBarVisible? <></> : <span>Saved Cities</span>}
        </button>

        <div className="searchBar" style={searchBarStyle}>
          <button style={searchButtonStyle} onClick={activateSearchBar}>
            
            {searchBarVisible?<FontAwesomeIcon icon={faTimes} />:<FontAwesomeIcon icon={faSearch} /> }
          </button>
          {searchBarVisible && <MiniWeatherForm updateWeather={fetchWeather}  />}
        </div>

        {sidebarVisible && (
          <Sidebar
            weatherList={savedWeathers}
            toggleVisibility={activateDefaultView}
            setWeather={setActiveWeather}
          />
        )}

        <div style={homeScreenStyle}>
          {weather ? (
            <WeatherDashboard weather={weather} />
          ) : (
            <WeatherForm updateWeather={fetchWeather} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

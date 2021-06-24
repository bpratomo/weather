import React from 'react';
import logo from './logo.svg';
import {WeatherCard} from "./components/WeatherCard";
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <WeatherCard cityName="Amsterdam"/>
      </header>
    </div>
  );
}

export default App;

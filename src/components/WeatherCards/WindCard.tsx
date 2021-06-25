import { FunctionComponent } from "react";
import { WeatherProps } from "../../interfaces/WeatherProps";
import { WeatherCardTemplate, Reading } from "./WeatherCardTemplate";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWind } from '@fortawesome/free-solid-svg-icons'

export const WindCard: FunctionComponent<WeatherProps> = ({ weather }) => {
  const speedReading: Reading = {
    readingTitle: "Speed",
    readingValue: weather?.wind.speed.toString() || "0",
    readingUnit: "m/s",
  };

  const directionReading: Reading = {
    readingTitle: "Direction",
    readingValue: weather?.wind.deg.toString() || "0",
    readingUnit: "°",
  };

  const title = <><FontAwesomeIcon icon={faWind}/> Wind</>

  const mainWindReading = [speedReading, directionReading];

  return (
    <WeatherCardTemplate cardTitle={title} mainReadings={mainWindReading} />
  );
};

import { FunctionComponent } from "react";
import { WeatherProps } from "../../interfaces/WeatherProps";
import { WeatherCardTemplate, Reading } from "./WeatherCardTemplate";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTint } from '@fortawesome/free-solid-svg-icons'


export const HumidityCard: FunctionComponent<WeatherProps> = ({ weather }) => {
  const humidityReading: Reading = {
    readingTitle: "Current",
    readingValue: weather?.main.humidity.toString() || "0",
    readingUnit: "%",
  };
  const title = <><FontAwesomeIcon icon={faTint}/> Humidity</>
  const mainReadings = [humidityReading];

  return (
    <WeatherCardTemplate cardTitle={title} mainReadings={mainReadings} />
  );
};


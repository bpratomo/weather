import { FunctionComponent } from "react";
import { WeatherProps } from "../../interfaces/WeatherProps";
import { WeatherCardTemplate, Reading } from "./WeatherCardTemplate";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons'

export const PressureCard: FunctionComponent<WeatherProps> = ({ weather }) => {
  const pressureReading: Reading = {
    readingTitle: "Current",
    readingValue: weather?.main.pressure.toString() || "0",
    readingUnit: "hPa",
  };

  const mainReadings = [pressureReading];
  const title = <><FontAwesomeIcon icon={faTachometerAlt}/> Pressure</>


  return (
    <WeatherCardTemplate cardTitle={title} mainReadings={mainReadings} />
  );
};

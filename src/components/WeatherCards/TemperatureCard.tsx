import { FunctionComponent } from "react";
import { WeatherProps } from "../../interfaces/WeatherProps";
import { WeatherCardTemplate, Reading } from "./WeatherCardTemplate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThermometerHalf } from "@fortawesome/free-solid-svg-icons";

export const TemperatureCard: FunctionComponent<WeatherProps> = ({
  weather,
}) => {
  const tempCurrent: Reading = {
    readingTitle: "Current",
    readingValue: weather?.main.temp.toString() || "0",
    readingUnit: "°C",
  };

  const tempMin: Reading = {
    readingTitle: "Min",
    readingValue: weather?.main.temp_min.toString() || "0",
    readingUnit: "°C",
    readingStyle: { backgroundColor: "lightsteelblue" },
  };

  const tempMax: Reading = {
    readingTitle: "Max",
    readingValue: weather?.main.temp_max.toString() || "0",
    readingUnit: "°C",
    readingStyle: { backgroundColor: "lightpink" },
  };

  const tempFeelsLike: Reading = {
    readingTitle: "Feels Like",
    readingValue: weather?.main.feels_like.toString() || "0",
    readingUnit: "°C",
  };




  const mainReadings = [tempCurrent];
  const secondaryReadings = [tempMin,tempFeelsLike,tempMax];


  const title = (
    <>
      <FontAwesomeIcon icon={faThermometerHalf} /> Temperature
    </>
  );

  return <WeatherCardTemplate cardTitle={title} mainReadings={mainReadings} secondaryReadings={secondaryReadings}/>;
};

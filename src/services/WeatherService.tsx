import fetch from "node-fetch";
import "dotenv/config";
import { ICurrentWeather } from "../interfaces/weatherInterface";

const API_KEY = process.env.API_KEY || "0df29c4a45b12f078f72df287f2a1ec6";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?";
const imageLink = "https://openweathermap.org/img/wn/";

export async function getWeather(cityName: string): Promise<ICurrentWeather> {
  let searchParams = `q=${cityName}&units=metric&appid=${API_KEY}`;
  let finalUrl = baseUrl.concat(searchParams);
  let response = await fetch(finalUrl);
  let data = await response.json();
  return data;
}

export function getWeatherIconLink(iconType: string): string {
  return `${imageLink}/${iconType}@4x.png`;
}

async function seedWeatherList(cityList: string[]): Promise<ICurrentWeather[]> {
  let promiseList = cityList.map((city) => getWeather(city));
  let weatherList = await Promise.all(promiseList);
  return weatherList;
}

export async function deleteLocation(
  weather: ICurrentWeather,
  weathers: ICurrentWeather[]
) {
  const listOfLocations = weathers.map((weather) => weather.name);
  const uniqueListOfLocation = listOfLocations.filter(
    (val, i, arr) => arr.indexOf(val) === i
  );

  const cityName = weather.name;
  const updatedListOfLocation = uniqueListOfLocation.filter(
    (val) => val !== cityName
  );

  await localStorage.setItem(
    "savedLocations",
    JSON.stringify(updatedListOfLocation)
  );
  return refreshWeathers(updatedListOfLocation);
}

export async function saveLocation(weathers: ICurrentWeather[]) {
  const listOfLocations = weathers.map((weather) => weather.name);
  const uniqueListOfLocation = listOfLocations.filter(
    (val, i, arr) => arr.indexOf(val) === i
  );
  await localStorage.setItem(
    "savedLocations",
    JSON.stringify(uniqueListOfLocation)
  );
  return refreshWeathers(uniqueListOfLocation);
}

export async function refreshWeathers(
  listOfCities: string[]
): Promise<ICurrentWeather[]> {
  let weatherPromises = listOfCities.map((cityName) => getWeather(cityName));
  let weathers = await Promise.all(weatherPromises);
  return weathers;
}

export async function getSavedWeathers(): Promise<ICurrentWeather[]> {
  let savedLocations = await localStorage.getItem("savedLocations");
  let savedWeathers = savedLocations
    ? await refreshWeathers(JSON.parse(savedLocations))
    : await seedWeatherList(["Amsterdam"]);

  return savedWeathers;
}

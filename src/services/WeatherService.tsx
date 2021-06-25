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

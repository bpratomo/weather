import fetch from "node-fetch"
import 'dotenv/config'
import {CurrentWeather} from "../interfaces/weatherInterface";

const API_KEY = process.env.API_KEY || "0df29c4a45b12f078f72df287f2a1ec6"
const base_url = "https://api.openweathermap.org/data/2.5/weather?"



export async function getWeather(cityName:string):Promise<CurrentWeather> {
    console.log(API_KEY)

    let searchParams = `q=${cityName}&appid=${API_KEY}`
    let finalUrl = base_url.concat(searchParams)
    console.log(finalUrl)
    let response = await fetch(finalUrl)
    let data = await response.json()
    return data

}






import {Controller, Get, Path, Route} from "tsoa";
import {WetterTag} from "./wetterHeute";
import axios from "axios";

// https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m

// https://api.open-meteo.com/v1/forecast?latitude=49.01&longitude=8.40&start_date=2021-01-01&end_date=2021-12-31&hourly=temperature_2m

// https://archive-api.open-meteo.com/v1/era5?latitude=52.52&longitude=13.41&start_date=2021-01-01&end_date=2021-12-31&hourly=temperature_2m

@Route('weather')
export class WeatherController extends Controller {
    @Get("{date}")
    public async getWeatherOfKarlsruhe(@Path() date : string): Promise<string> {
        return axios
            .get(`https://api.open-meteo.com/v1/forecast?latitude=49.17&longitude=8.49&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&forecast_days=1&timezone=Europe%2FBerlin&start_date=${date}&end_date=${date}`)
            .then((data) => data.data)
            .catch(() => 'Hat net geklappt ._.');
    }
}
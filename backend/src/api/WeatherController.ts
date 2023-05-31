import {Controller, Get, Path, Route} from "tsoa";
import axios from "axios";

@Route('weather')
export class WeatherController extends Controller {
    @Get("{date}")
    public async getWeatherOfKarlsruhe(@Path() date : string): Promise<string> {
        return axios
            .get(`https://api.open-meteo.com/v1/forecast?latitude=49.17&longitude=8.49&daily=temperature_2m_max,temperature_2m_min&forecast_days=1&timezone=Europe%2FBerlin&start_date=${date}&end_date=${date}`)
            .then((data) => data.data)
            .catch(() => Promise.reject("WetterApi ist nicht verfügbar!"));
    }
}
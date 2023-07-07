import { Controller, Get, Path, Route } from 'tsoa';
import { AppDataSource } from '../data-source';
import {City} from "../db/City";
import {js2xml} from "xml-js";

@Route('cityInformation')
export class CityInformation extends Controller {
    private select: any;
    @Get('{city}')
    public async getCityInformation(@Path() city: string): Promise<string> {
        const countryRepository = AppDataSource.getRepository(City);
        let currentCity = await countryRepository.find({ where: {name: city.charAt(0).toUpperCase() + city.slice(1)}, select: {name: true, shortDescription: true, longDescription: true}});
        if (currentCity.length != 0) {
            return js2xml(currentCity[0], {compact: true, ignoreComment: true, spaces: 4});
        } else {
            return Promise.reject('City not found!');
        }
    }

}
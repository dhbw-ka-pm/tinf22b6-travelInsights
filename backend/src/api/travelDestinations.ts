import { Controller, Get, Path, Route } from 'tsoa';
import { AppDataSource } from '../data-source';
import { Country } from '../db/Country';

@Route('travelDestinations')
export class TravelDestinations extends Controller {
  @Get('{country}')
  public async getTravelDestinationForCountry(@Path() country: string): Promise<Country> {
    const countryRepository = AppDataSource.getRepository(Country);
    let currentCountry = await countryRepository.find({ where: { name: country.charAt(0).toUpperCase()+ country.slice(1) }, relations: { cities: true } });
    if (currentCountry.length != 0) {
      return currentCountry[0];
    } else {
      return Promise.reject('Country not found!');
    }
  }
}
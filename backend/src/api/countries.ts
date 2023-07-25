import { Controller, Get, Route } from 'tsoa';
import { AppDataSource } from '../data-source';
import { Country } from '../db/Country';

@Route('countries')
export class Countries extends Controller {
    @Get()
    public async getCountries(): Promise<string[]> {
        const countryRepository = AppDataSource.getRepository(Country);
        let query = countryRepository.createQueryBuilder().addSelect('*');
        let countries = await query.getMany();

        if (countries.length != 0) {
            let res:string[] = [];
            countries.map((country) => res.push(country.name));
            return res;
        } else {
            return Promise.reject('Country not found!');
        }
    }
}
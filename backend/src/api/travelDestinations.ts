import xml2json from '@hendt/xml2json/lib';
import { readFile } from 'fs/promises';
import { Controller, Get, Path, Res, Route, TsoaResponse } from 'tsoa';

interface City {
  name: string;
}

interface Country {
  name: string;
  cities: Array<City>;
}

@Route('travelDestinations')
export class TravelDestinations extends Controller {
  @Get('{country}')
  public async getTravelDestinationForCountry(@Path() country: string, @Res() errorResponse: TsoaResponse<500, {
    reason: string
  }>): Promise<Array<City>> {
    return this.parseXmlForCountry(country)
      .then((response) => {
        if (response.length === 0) {
          return errorResponse(500, { reason: 'Land nicht gefunden!' });
        } else {
          return response;
        }
      })
      .catch(() => {
        return errorResponse(500, { reason: 'Land nicht gefunden!' });
      });
  }

  private async parseXmlForCountry(country: string): Promise<Array<City>> {
    return readFile(__dirname + '/../util/out.xml')
      .then((buffer) => {
        const json = xml2json(buffer.toString());
        return json.countries.country
          .filter((object: Country) => object.name === country)[0].city;
      })
      .catch(() => Promise.reject);
  }
}
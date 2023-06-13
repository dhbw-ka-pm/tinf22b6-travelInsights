import axios from 'axios';
import { Controller, Get, Path, Res, Route, TsoaResponse } from 'tsoa';

export interface CountryInformation {
  lat: number;
  lng: number;
}

@Route('nameToGeoLocation')
export class GeoLocation extends Controller {
  @Get('{place}')
  public async GetLocationFromString(@Path() place: string, @Res() errorResponse: TsoaResponse<400, {
    reason: string
  }>): Promise<CountryInformation> {
    return axios.get('https://nominatim.openstreetmap.org/search?q=' + place + '&format=json&polygon=1&addressdetails=1')
      .then((response) => {
        return { lat: response.data[0].lat, lng: response.data[0].lon };
      })
      .catch(() => {
        return errorResponse(400, { reason: 'Koordinaten konnten nicht gefunden werden!' });
      });
  }

}
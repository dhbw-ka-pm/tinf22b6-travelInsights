import axios from "axios";
import { Controller, Get, Path, Res, Route, TsoaResponse } from "tsoa";

export interface IGeoLocation {
  lat: number;
  lng: number;
}

@Route("nameToGeoLocation")
export class GeoLocation extends Controller {
  @Get("{place}")
  public async GetLocationFromString(
    @Path() place: string
  ): Promise<IGeoLocation> {
    return axios
      .get(
        "https://nominatim.openstreetmap.org/search?q=" +
          place +
          "&format=json&limit=1"
      )
      .then((response) => {
        return { lat: response.data[0].lat, lng: response.data[0].lon };
      })
      .catch(() => {
        return Promise.reject();
      });
  }
}

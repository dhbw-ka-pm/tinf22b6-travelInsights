import axios from "axios";
import { Controller, Get, Path, Route } from "tsoa";
import { AppDataSource } from "../data-source";
import { City } from "../db/City";
import { Country } from "../db/Country";

export interface ICityDescription {
  short: string;
  long: string;
}

export interface ICityData {
  imageUrl: string;
  description: ICityDescription;
  location: IGeoLocation;
}

export interface IGeoLocation {
  lat: number;
  lng: number;
}

@Route("cityData")
export class CityData extends Controller {
  @Get("{country}/{place}")
  public async GetCityData(@Path("country") country:string, @Path("place") place: string): Promise<ICityData> {
    const countryRepository = AppDataSource.getRepository(Country);
    const cityRespoitory = AppDataSource.getRepository(City);
    let currentCountry = await countryRepository.find({where: {name: country}})
    console.log(currentCountry);
    
    if (currentCountry.length === 0) {
      console.log("Country not found, creating new Entry");
      
      const newCountry = new Country();
      const countryCoordinates = await this.getCoordinates(place).catch(() => {
        return Promise.reject();
      });
      newCountry.lat = countryCoordinates.lat;
      newCountry.lng = countryCoordinates.lng;
      newCountry.name = country;
      newCountry.cities = [];
      await countryRepository.save(newCountry);
    }
    
    currentCountry = await countryRepository.find({where: {name: country}});
    let currentCity = await cityRespoitory.find({where: {country: currentCountry}});
    
    if (currentCity.length === 0) {
      
    const googleData = await this.getGoogleData(place).catch(() => {
      return Promise.reject("Google Api Reject");
    });
    const wikiData = await this.getWikipediaDescription(place).catch(() => {
      return "No Wiki information available!";
    });
    const cityCoordinates = await this.getCoordinates(place).catch(() => {
      return Promise.reject("Coordinates not found");
    });
    const city = new City();
    city.name = place;
    city.shortDescription = googleData.description;
    city.longDescription = wikiData;
    city.imageSrc = googleData.image;
    city.lat = cityCoordinates.lat;
    city.lng = cityCoordinates.lng;
    city.country = currentCountry[0];

    await cityRespoitory.save(city);
    }

    currentCity = await cityRespoitory.find({where: {country: currentCountry}})
    return {
      location: {
        lat: currentCity[0].lat,
        lng: currentCity[0].lng,
      },
      imageUrl: currentCity[0].imageSrc,
      description: {
        short: currentCity[0].longDescription,
        long: currentCity[0].shortDescription,
      },
    };
  }

  private async getCoordinates(place: string): Promise<IGeoLocation> {
    return axios
      .get(
        `https://nominatim.openstreetmap.org/search?q=${place}&format=json&limit=1`
      )
      .then((response) => {
        return { lat: response.data[0].lat, lng: response.data[0].lon };
      })
      .catch(() => {
        return Promise.reject("Can't get location from String");
      });
  }

  private async getGoogleData(
    place: string
  ): Promise<{ image: string; description: string }> {
    if (place.includes("Isla de")) {
      place = place.split(" ")[2];
    }
    return axios
      .get(
        `https://kgsearch.googleapis.com/v1/entities:search?query=${place}&key=${process.env.GOOGLE_API_KEY}&limit=10`
      )
      .then((result) => {
        for (let entry of result.data.itemListElement) {
          if (
            entry.result["@type"].includes("City") ||
            entry.result["@type"].includes("AdministrativeArea") ||
            entry.result["@type"].includes("Place")
          ) {
            return {
              image: entry.result.image.contentUrl,
              description: entry.result.detailedDescription.articleBody,
            };
          }
        }
        return Promise.reject();
      });
  }

  private async getWikipediaDescription(place: string): Promise<string> {
    return axios
      .get(
        `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=1&explaintext=1&titles=${place}`
      )
      .then((response) => {
        const pages = response.data.query.pages;
        for (let page in pages) {
          return pages[page].extract;
        }
      });
  }
}

import axios from "axios";
import { Controller, Get, Path, Route } from "tsoa";
import { AppDataSource } from "../data-source";
import { City } from "../db/City";
import { Country } from "../db/Country";

export interface IMediaCardDescription {
  short: string;
  long: string;
}

export interface IMediaCard {
  imageUrl: string;
  description: IMediaCardDescription;
}

@Route("mediaCard")
export class MediaCard extends Controller {
  @Get("{place}")
  public async GetMediaCard(@Path("place") place: string): Promise<IMediaCard> {
    const countryRepository = AppDataSource.getRepository(Country);

    const googleData = await this.getGoogleData(place).catch(() => {
      return Promise.reject();
    });
    const wikiData = await this.getWikipediaDescription(place).catch(() => {
      return "No Wiki information available!";
    });

    const city = new City();
    city.shortDescription = googleData.description;
    city.longDescription = wikiData;
    city.imageSrc = googleData.image;

    return {
      imageUrl: googleData.image,
      description: {
        short: googleData.description,
        long: wikiData,
      },
    };
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

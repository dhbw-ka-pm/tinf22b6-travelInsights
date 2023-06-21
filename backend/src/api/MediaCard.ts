import axios from "axios";
import { Controller, Get, Path, Res, Route, TsoaResponse } from "tsoa";

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
  public async GetMediaCard(@Path() place: string): Promise<IMediaCard> {
    const googleData = await this.getGoogleData(place).catch(() => {
      return Promise.reject();
    });
    const wikiData = await this.getWikipediaDescription(place).catch(() => {
      return "No Wiki information available!";
    });
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
        `https://kgsearch.googleapis.com/v1/entities:search?query=${place}&key=AIzaSyClaSGqnwq0jXcFN0CUcvrnZS3EIty_lf4&limit=10`
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
          } else {
            continue;
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

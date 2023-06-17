//
import axios from 'axios';
import { Controller, Get, Path, Res, Route, TsoaResponse } from 'tsoa';

@Route('cardInformation')
export class CardInformation extends Controller {
  @Get('{place}')
  public async getCardInformation(@Path() place: string, @Res() errorResponse: TsoaResponse<400, {
    reason: string
  }>): Promise<{ extract: string }> {
    return axios.get(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=1&explaintext=1&titles=${place}`)
      .then((response) => {
        const pages = response.data.query.pages;
        for (let page in pages) {
          return { extract: pages[page].extract };
        }
      })
      .catch(() => {
        return errorResponse(400, { reason: 'Bild konnte nicht gefunden werden!' });
      });
  }

}
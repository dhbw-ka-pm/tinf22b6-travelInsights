import axios from 'axios';
import { Controller, Get, Path, Res, Route, TsoaResponse } from 'tsoa';

@Route('cardImage')
export class CardImage extends Controller {
  @Get('{place}')
  public async GetCardImage(@Path() place: string, @Res() errorResponse: TsoaResponse<400, {
    reason: string
  }>): Promise<{ source: string }> {
    return axios.get(`https://en.wikipedia.org/w/api.php?action=query&titles=${place}&prop=pageimages&format=json&pithumbsize=500`)
      .then((response) => {
        const pages = response.data.query.pages;
        for (let page in pages) {
          return { source: pages[page].thumbnail.source };
        }
      })
      .catch(() => {
        return errorResponse(400, { reason: 'Bild konnte nicht gefunden werden!' });
      });
  }

}
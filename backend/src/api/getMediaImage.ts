import axios from 'axios';
import { Controller, Get, Path, Res, Route, TsoaResponse } from 'tsoa';

@Route('mediaImage')
export class MediaImage extends Controller {
  @Get('{place}')
  public async GetMediaImage(@Path() place: string, @Res() errorResponse: TsoaResponse<400, {
    reason: string
  }>): Promise<{ source: string }> {
    return axios.get(`https://en.wikipedia.org/w/api.php?action=query&titles=${place}&prop=pageimages&format=json&pithumbsize=300`)
      .then((response) => {
        console.log(response.data);
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
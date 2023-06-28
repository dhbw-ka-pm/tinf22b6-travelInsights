import { Controller, Get, Route } from 'tsoa';

export interface WetterTag {
  date: number;
  temperaturen: number[];
}

@Route('wetterHeute')
export class WetterController extends Controller {
  @Get()
  public async getWetterHeute(): Promise<WetterTag> {
    return { date: Date.now(), temperaturen: [6, 6, 5, 7, 8, 9, 9, 9, 24, 17, 2, 2, 2, 2, 2] };
  }
}

import axios from 'axios';
import { Body, Controller, Get, Post, Res, Route, TsoaResponse } from 'tsoa';

export interface WetterTag {
    date: number;
    temperaturen: number[];
  }

@Route('wetterHeute')
export class WetterController extends Controller {
	@Get()
	public async getWetterHeute(): Promise<WetterTag> {
		return {date: Date.now(), temperaturen: [6,6,5,7,8,9,9,9,24,17,2,2,2,2,2]};
	}

    @Post()
    public async postWetterHeute(): Promise<string> {
        return axios.get('https://cat-fact.herokuapp.com/facts/random').then((data) => {return data.data}).catch(() => {return "hat nicht funktioniert"});
    }
}

import { Body, Controller, Get, Post, Res, Route, TsoaResponse } from 'tsoa';

@Route('test')
export class DummyController extends Controller {
	@Get()
	public async getHelloWorld(
		@Res() errorResponse: TsoaResponse<409, { reason: string }>
	): Promise<string> {
		return "Hello World!";
	}
}

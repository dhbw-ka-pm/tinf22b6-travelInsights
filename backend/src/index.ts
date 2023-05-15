import cors from 'cors';
import express from 'express';

import { RegisterRoutes } from './routes.generated';

const serverPort = 4567;

const app = express();
app.use(cors());
app.use(express.json());

RegisterRoutes(app);

if (process.env.NODE_ENV !== 'production') {
	import('swagger-ui-express').then(async (swaggerUI) => {
		const openApiSpec = await import('./openapi.generated.json');
		app.use('/api/doc', swaggerUI.serve, swaggerUI.setup(openApiSpec));
	});
}

app.listen(serverPort, () => {
	console.log(`Server is listening on port ${serverPort}`);
});

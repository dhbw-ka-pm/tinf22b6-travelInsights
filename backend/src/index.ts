import cors from "cors";
import express from "express";
import "reflect-metadata";

import { RegisterRoutes } from "./routes.generated";
import { AppDataSource } from "./data-source";

const serverPort = 4567;

const app = express();
app.use(cors());
app.use(express.json());

RegisterRoutes(app);

if (process.env.NODE_ENV !== "production") {
  import("swagger-ui-express").then(async (swaggerUI) => {
    const openApiSpec = await import("./openapi.generated.json");
    app.use("/api/doc", swaggerUI.serve, swaggerUI.setup(openApiSpec));
  });
}

AppDataSource.initialize()
  .then(() => {
    app.listen(serverPort, () => {
      console.log(`Server is listening on port ${serverPort}`);
    });
  })
  .catch((error) => console.log(error));

# Travel Insights

## TL;DR

```bash
yarn install  # install dependencies
yarn gen # generate API code and spec
(cd backend; yarn start:dev) # start the backend with auto reload
(cd frontend; yarn start) # start the frontend with auto reload (exception see below)
```

### Tested with

> [yarn --version]
> 1.22.19

> [node --version]
> v18.16.0

# Backend

The backend implements a REST API using TSOA and ExpressJS.

Current hitrate: 80.7%
6161 Entries in Data Dump to 4973 qualified (but not verified) Data Sets


## OpenAPI

The API specification can be generated using the `yarn workspace travel-insights-backend gen:openapi`. Output will
be `src/openapi.generated.json`.

## API Documentation

In development (NODE_ENV != production) mode the API documentation can be found at:
`http://localhost:4567/api/doc`

# Frontend

The frontend is implemented using ReactJS with functional components and React Hooks.

## API Access

Restful-react is used for generating typed API helpers from the OpenAPI spec.

`yarn workspace travel-insights-frontend gen`

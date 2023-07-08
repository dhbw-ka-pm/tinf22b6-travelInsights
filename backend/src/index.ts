import cors from 'cors';
import express from 'express';
import 'reflect-metadata';

import { RegisterRoutes } from './routes.generated';
import { AppDataSource } from './data-source';
import FillDatabase from './util/DataBase';
import { City } from './db/City';
import axios from 'axios';
import { js2xml } from 'xml-js';

const serverPort = 4567;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/xslt/weather.xslt', express.static('xslt/weather.xslt'));

app.get('/api/weather/:city', async (req, res) => {
  res.setHeader('Content-Type', 'application/xml')
  const city = req.params.city;
  const cityRepository = AppDataSource.getRepository(City);
    let resultCity = await cityRepository.find({ where: { name: city.charAt(0).toUpperCase() + city.slice(1) } });
    let currentCity: City;
    if (resultCity.length > 0) {
      currentCity = resultCity[0];
      const startDate = "2023-07-08";
      const endDate = "2023-07-14"
      try {
        const data = await axios
          .get(`https://api.open-meteo.com/v1/forecast?latitude=${currentCity.lat}&longitude=${currentCity.lng}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto&start_date=${startDate}&end_date=${endDate}`);
        res.send(xmlify(data.data));
      } catch {
        res.sendStatus(500);
      }
    } else {
      res.sendStatus(500);
    }
});

function xmlify(weatherReport: any): string {
  let array = [];
  for (let i in weatherReport.daily.time) {
    array.push({
      date: weatherReport.daily.time[i],
      weatherCode: weatherReport.daily.weathercode[i],
      minTemp: weatherReport.daily.temperature_2m_min[i],
      maxTemp: weatherReport.daily.temperature_2m_max[i]
    })
  }
  const weatherReportReply = { report: array };
  const test = `<?xml version="1.0" encoding="UTF-8"?><weatherReports>${js2xml(weatherReportReply, { compact: true })}</weatherReports>`;
  return test;
}

RegisterRoutes(app);

if (process.env.NODE_ENV !== 'production') {
  import('swagger-ui-express').then(async (swaggerUI) => {
    const openApiSpec = await import('./openapi.generated.json');
    app.use('/api/doc', swaggerUI.serve, swaggerUI.setup(openApiSpec));
  });
}

AppDataSource.initialize()
  .then(() => {
    FillDatabase().then(() => {
      app.listen(serverPort, () => {
        console.log(`Server is listening on port ${serverPort}`);
      });
    });
  })
  .catch((error) => console.log(error));

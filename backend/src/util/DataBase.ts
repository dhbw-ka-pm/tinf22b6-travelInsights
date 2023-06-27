import { AppDataSource } from '../data-source';
import { readFile } from 'fs/promises';
import xml2json from '@hendt/xml2json/lib';
import { Country } from '../db/Country';
import axios from 'axios/index';
import { IGeoLocation } from '../api/CityData';
import { City } from '../db/City';

interface ICity {
  name: string;
}

interface ICountry {
  name: string;
  cities: Array<ICity>;
}

export async function FillDatabase() {
  const countryRepository = AppDataSource.getRepository(Country);
  let count = await countryRepository.count();
  console.log(count);
  if (count > 0) {
    return;
  } else {
    console.log('No entries found, scanning for Data Source!');
    return readFile(__dirname + '/out.xml')
      .then(async (buffer) => {
        const json = xml2json(buffer.toString());

        const countryRepository = AppDataSource.getRepository(Country);
        const cityRespoitory = AppDataSource.getRepository(City);

        for (let country of json.countries.country) {
          let currentCountry = await countryRepository.find({ where: { name: country } });
          console.log(currentCountry);

          if (currentCountry.length === 0) {
            console.log('Country not found, creating new for', country);
            const newCountry = new Country();
            const countryCoordinates = await getCoordinates(country.name).catch(() => {
              return Promise.reject();
            });
            newCountry.lat = countryCoordinates.lat;
            newCountry.lng = countryCoordinates.lng;
            newCountry.name = country;
            newCountry.cities = [];
            await countryRepository.save(newCountry);
            currentCountry = await countryRepository.find({ where: { name: country } });
          }

          for (let city of country.city) {
            // TODO Städte einfügen
          }

          let currentCity = await cityRespoitory.find({ where: { country: currentCountry } });

          if (currentCity.length === 0) {

            const googleData = await getGoogleData(place).catch(() => {
              return Promise.reject('Google Api Reject');
            });
            const wikiData = await getWikipediaDescription(place).catch(() => {
              return 'No Wiki information available!';
            });
            const cityCoordinates = await getCoordinates(place).catch(() => {
              return Promise.reject('Coordinates not found');
            });
            const city = new City();
            city.name = place;
            city.shortDescription = googleData.description;
            city.longDescription = wikiData;
            city.imageSrc = googleData.image;
            city.lat = cityCoordinates.lat;
            city.lng = cityCoordinates.lng;
            city.country = currentCountry[0];

            await cityRespoitory.save(city);
          }

          currentCity = await cityRespoitory.find({ where: { country: currentCountry } });
          return {
            location: {
              lat: currentCity[0].lat,
              lng: currentCity[0].lng
            },
            imageUrl: currentCity[0].imageSrc,
            description: {
              short: currentCity[0].longDescription,
              long: currentCity[0].shortDescription
            }
          };

        }
      })
      .catch((reason) => {
        return Promise.reject(reason);
      });
  }
}

async function getCoordinates(place: string): Promise<IGeoLocation> {
  return axios
    .get(
      `https://nominatim.openstreetmap.org/search?q=${place}&format=json&limit=1`
    )
    .then((response) => {
      return { lat: response.data[0].lat, lng: response.data[0].lon };
    })
    .catch(() => {
      return Promise.reject('Can\'t get location from String');
    });
}

async function getGoogleData(place: string): Promise<{ image: string; description: string }> {
  if (place.includes('Isla de')) {
    place = place.split(' ')[2];
  }
  return axios
    .get(
      `https://kgsearch.googleapis.com/v1/entities:search?query=${place}&key=${process.env.GOOGLE_API_KEY}&limit=10`
    )
    .then((result) => {
      for (let entry of result.data.itemListElement) {
        if (
          entry.result['@type'].includes('City') ||
          entry.result['@type'].includes('AdministrativeArea') ||
          entry.result['@type'].includes('Place')
        ) {
          return {
            image: entry.result.image.contentUrl,
            description: entry.result.detailedDescription.articleBody
          };
        }
      }
      return Promise.reject();
    });
}

async function getWikipediaDescription(place: string): Promise<string> {
  return axios
    .get(
      `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=1&explaintext=1&titles=${place}`
    )
    .then((response) => {
      const pages = response.data.query.pages;
      for (let page in pages) {
        return pages[page].extract;
      }
    });
};

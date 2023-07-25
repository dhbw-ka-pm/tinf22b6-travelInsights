import * as React from 'react';
import { type LatLngLiteral } from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';
import {
  Grid,
  LinearProgress,
  Typography
} from '@mui/material';
import { ExploreOff } from '@mui/icons-material';
import {
  type City,
  useGetTravelDestinationForCountry
} from '../api.generated';
import { useEffect, useState } from 'react';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import { useLoaderData } from 'react-router-dom';
import MediaCard from '../components/MediaCard';
import MapMarker from '../components/MapMarker';
import CountrySelect from '../components/CountrySelect';

const LeafletMap = (): React.ReactElement => {
  const urlParam = useLoaderData() as string;
  const { loading: loadingDestinations, data } =
    useGetTravelDestinationForCountry({
      country: urlParam === 'browse' ? 'Worldwide' : urlParam
    });

  const [searchValue] = useState(
    urlParam === 'browse' ? 'Worldwide' : urlParam
  );

  const [pinData, setPinData] = useState<City[]>([]);
  const [searchedLocation, setSearchedLocation] = useState<LatLngLiteral>({
    lat: 51.505,
    lng: -0.09
  });
  const [mapKey, setMapKey] = useState(0);

  useEffect(() => {
    if (!loadingDestinations) {
      if (data != null) {
        setPinData(data.cities);
        setSearchedLocation({ lat: data.lat, lng: data.lng });
        setMapKey((prevKey) => prevKey + 1); // Update mapKey to remount MapContainer
      } else {
        setPinData([]);
      }
    } else {
      setPinData([]);
    }
  }, [urlParam, data, location]);

  return (
    <>
      <ResponsiveAppBar />
      <Grid container>
        <Grid item xs={10}>
          <MapContainer
            key={mapKey}
            center={searchedLocation}
            zoom={5}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            {pinData.map((city) => {
              return <MapMarker city={city} key={city.name} />;
            })}
          </MapContainer>
        </Grid>
        <Grid item xs={2}>
          <Grid
            container
            direction={'column'}
            style={{ maxHeight: '93vh', overflow: 'auto', flexWrap: 'nowrap' }}
          >
            <Grid item>
              <CountrySelect currentCountry={searchValue} />
            </Grid>
            {loadingDestinations ? (
              <Grid item>
                <LinearProgress />
              </Grid>
            ) : pinData.length > 0 ? (
              <Grid item>
                {pinData.map((city) => {
                  return <MediaCard key={city.name} city={city} />;
                })}
              </Grid>
            ) : (
              <>
                <Grid
                  container
                  sx={{ width: '100%' }}
                  justifyContent={'center'}
                >
                  <Grid item>
                    <ExploreOff style={{ fontSize: 60 }} />
                  </Grid>
                  <Grid item>
                    <Typography>
                      {searchValue} was not found. <br /> Try searching for a
                      country such as 'Spain' or 'France'
                    </Typography>
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default LeafletMap;

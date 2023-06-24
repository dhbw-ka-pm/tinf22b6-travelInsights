import * as React from 'react';
import { type LatLngLiteral } from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';
import {
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  TextField,
  Typography
} from '@mui/material';
import { ExploreOff, Search } from '@mui/icons-material';
import {
  type City,
  useGetTravelDestinationForCountry,
  useGetLocationFromString
} from '../api.generated';
import { useEffect, useState } from 'react';
import ResponsiveAppBar from '../components/AppBar';
import { Link, useLoaderData, useSubmit } from 'react-router-dom';
import NewMediaCard from '../components/NewMediaCard';

const LeafletMap = (): React.ReactElement => {
  const urlParam = useLoaderData() as string;
  const submit = useSubmit();
  const { loading: loadingDestinations, data } =
    useGetTravelDestinationForCountry({
      country: urlParam === 'browse' ? 'Worldwide' : urlParam
    });

  const { loading: loadingLocation, data: location } = useGetLocationFromString(
    { place: urlParam }
  );

  const [searchValue, setSearchValue] = useState(
    urlParam === 'browse' ? 'Worldwide' : urlParam
  );

  const [pinData, setPinData] = useState<City[]>([]);
  const [searchedLocation, setSearchedLocation] = useState<LatLngLiteral>({
    lat: 51.505,
    lng: -0.09
  });
  const [mapKey, setMapKey] = useState(0);

  useEffect(() => {
    console.log(pinData);

    if (!loadingDestinations && !loadingLocation) {
      if (data != null && location != null) {
        setPinData(data);
        setSearchedLocation(location);
        setMapKey((prevKey) => prevKey + 1); // Update mapKey to remount MapContainer
      } else {
        setPinData([]);
      }
    } else {
      setPinData([]);
    }
  }, [urlParam, data, location]);

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === 'Enter') {
      event.preventDefault();
      submit(null, { method: 'get', action: '/map/' + searchValue });
    }
  };

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
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>
        </Grid>
        <Grid item xs={2}>
          <Grid
            container
            direction={'column'}
            style={{ maxHeight: '92vh', overflow: 'auto', flexWrap: 'nowrap' }}
          >
            <Grid item>
              <TextField
                fullWidth
                value={searchValue}
                onKeyDown={handleKeyDown}
                onChange={(event) => {
                  setSearchValue(event.target.value);
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton component={Link} to={'/map/' + searchValue}>
                        <Search />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            {loadingDestinations ? (
              <Grid item>
                <LinearProgress />
              </Grid>
            ) : pinData.length > 0 ? (
              <Grid item>
                {pinData.map((city) => {
                  return <NewMediaCard key={city.name} name={city.name} />;
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

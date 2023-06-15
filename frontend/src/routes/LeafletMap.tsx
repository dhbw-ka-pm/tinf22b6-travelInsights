import * as React from 'react';
import { type LatLngLiteral } from 'leaflet';
import {
  MapContainer,
  TileLayer,
  useMapEvents
} from 'react-leaflet';
import { CircularProgress, Grid, IconButton, InputAdornment, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';
import { type City, useGetTravelDestinationForCountry } from '../api.generated';
import MediaCard from '../components/MediaCard';
import { useEffect, useState } from 'react';
import ResponsiveAppBar from '../components/AppBar';
import { Link, useLoaderData, useSubmit } from "react-router-dom";

const LeafletMap = (): React.ReactElement => {
  const urlParam = useLoaderData() as string;
  const submit = useSubmit();
  const { loading, data } = useGetTravelDestinationForCountry({ country: urlParam === "browse" ? "Worldwide" : urlParam });

  const [searchValue, setSearchValue] = useState(urlParam === "browse" ? "Worldwide" : urlParam);

  const [pinData, setPinData] = useState<City[]>();
  const [searchedLocation, setSearchedLocation] = useState<
    LatLngLiteral | undefined
  >(undefined);
  const [mapKey, setMapKey] = useState(0);


  useEffect(() => {
    if (!loading) {
      if (data != null) {
        setPinData(data);
        fetchLocation(urlParam);
      }
    }
  }, [urlParam, data]);

  const fetchLocation = (searchValue: string): void => {
    fetch(
      `https://nominatim.openstreetmap.org/search?q=${searchValue}&format=json&limit=1`
    )
      // eslint-disable-next-line @typescript-eslint/promise-function-async
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          const { lat, lon } = data[0];
          setSearchedLocation({ lat: parseFloat(lat), lng: parseFloat(lon) });
          setMapKey((prevKey) => prevKey + 1); // Update mapKey to remount MapContainer
        }
      })
      .catch((error) => {
        console.error('Error occurred while searching:', error);
      });
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === 'Enter') {
      event.preventDefault();
      submit(null, { method: "get", action: "/map/" + searchValue })
    }
  };

  const MapEvents = (): any => {
    useMapEvents({
      click: (event) => {
        const { lat, lng } = event.latlng;
        setSearchedLocation({ lat, lng });
        setMapKey((prevKey) => prevKey + 1); // Update mapKey to remount MapContainer
      }
    });

    return null;
  };

  const position: LatLngLiteral = searchedLocation ?? {
    lat: 51.505,
    lng: -0.09
  };

  return (
    <>
    <ResponsiveAppBar />
      <Grid container>
        <Grid item xs={9}>
          <MapContainer
            key={mapKey}
            center={position}
            zoom={5}
            scrollWheelZoom={true}
          >
            <MapEvents />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
          </MapContainer>
        </Grid>
        <Grid item xs={3}>
          <Grid
            container
            style={{ maxHeight: '92vh', overflow: 'auto' }}
            rowGap={1}
          >
            <Grid>
              <TextField
                fullWidth
                value={searchValue}
                onKeyDown={(handleKeyDown)}
                onChange={(event) => {setSearchValue(event.target.value)}}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton component={Link} to={'/map/' + searchValue}>
                        <Search />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            {loading ? <CircularProgress /> : pinData?.map((city) => {
              return <MediaCard key={city.name} name={city.name}></MediaCard>;
            })}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default LeafletMap;

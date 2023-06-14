import * as React from 'react';
import { type LatLngLiteral, type LatLngBoundsLiteral } from 'leaflet';
import {
  MapContainer,
  SVGOverlay,
  TileLayer,
  useMapEvents
} from 'react-leaflet';
import { Grid, IconButton, InputAdornment, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { type City, useGetTravelDestinationForCountry } from '../api.generated';
import MediaCard from '../components/MediaCard';

const LeafletMap = (): React.ReactElement => {
  const [searchValue, setSearchValue] = useState('');
  const { loading, data, refetch } = useGetTravelDestinationForCountry({country: searchValue});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pinData, setPinData] = useState<City[]>();
  const [searchedLocation, setSearchedLocation] = useState<
    LatLngLiteral | undefined
  >(undefined);
  const [mapKey, setMapKey] = useState(0);

  useEffect(() => {
    if (!loading && data !== null) {
      setPinData(data);
      console.log(data)
    }
  }, [data])

  const fetchLocation = (): void => {
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
      if (searchValue !== '') {
        fetchLocation();
      }
    }
  };

  const handleSearch = (): void => {
    if (searchValue !== '') {
      refetch().then(() => {fetchLocation()}).catch(() => {});
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
  const bounds: LatLngBoundsLiteral = [
    [51.49, -0.08],
    [51.5, -0.06]
  ];

  return (
    <>
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
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <SVGOverlay attributes={{ stroke: 'red' }} bounds={bounds}>
              <rect x="0" y="0" width="100%" height="100%" fill="blue" />
              <circle r="5" cx="10" cy="10" fill="red" />
              <text x="50%" y="50%" stroke="white">
                text
              </text>
            </SVGOverlay>
          </MapContainer>
        </Grid>
        <Grid item xs={3}>
          <Grid
            container
            style={{ maxHeight: '100vh', overflow: 'auto' }}
            rowGap={1}
          >
            <Grid>
              <TextField
                fullWidth
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
                onKeyDown={handleKeyDown}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleSearch}>
                        <Search />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            {pinData?.map((city) => {return <MediaCard name={city.name}></MediaCard>})}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default LeafletMap;

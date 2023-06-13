import { useMapEvents } from "react-leaflet";
import { ReactElement, useContext, useState } from "react";
import { MapContainer, SVGOverlay, TileLayer } from "react-leaflet";
import { PageState, PageStateContext } from "../App";
import { Button, Grid, InputAdornment, Paper, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import { LatLngLiteral, LatLngBoundsLiteral } from "leaflet";

const LeafletMap = (): ReactElement => {
  const { setState } = useContext(PageStateContext);
  const [searchValue, setSearchValue] = useState("");
  const [searchedLocation, setSearchedLocation] = useState<LatLngLiteral | null>(null);
  const [mapKey, setMapKey] = useState(0);

  const fetchLocation = () => {
    fetch(
      `https://nominatim.openstreetmap.org/search?q=${searchValue}&format=json&limit=1`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          const { lat, lon } = data[0];
          setSearchedLocation({ lat: parseFloat(lat), lng: parseFloat(lon) });
          setMapKey((prevKey) => prevKey + 1); // Update mapKey to remount MapContainer
        }
      })
      .catch((error) => {
        console.error("Error occurred while searching:", error);
      });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (searchValue !== "") {
        fetchLocation();
      }
    }
  };

  const handleSearch = () => {
    if (searchValue !== "") {
      fetchLocation();
    }
  };

  const MapEvents = () => {
    const map = useMapEvents({
      click: (event) => {
        const { lat, lng } = event.latlng;
        setSearchedLocation({ lat, lng });
        setMapKey((prevKey) => prevKey + 1); // Update mapKey to remount MapContainer
      }
    });

    return null;
  };

  const position: LatLngLiteral = searchedLocation || { lat: 51.505, lng: -0.09 };
  const bounds: LatLngBoundsLiteral = [
    [51.49, -0.08],
    [51.5, -0.06],
  ];

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <MapContainer key={mapKey} center={position} zoom={5} scrollWheelZoom={true}>
            <MapEvents />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <SVGOverlay attributes={{ stroke: "red" }} bounds={bounds}>
              <rect x="0" y="0" width="100%" height="100%" fill="blue" />
              <circle r="5" cx="10" cy="10" fill="red" />
              <text x="50%" y="50%" stroke="white">
                text
              </text>
            </SVGOverlay>
          </MapContainer>
        </Grid>
        <Grid item xs={3}>
          <Paper>
            <TextField
              fullWidth
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyDown}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Search onClick={handleSearch} />
                  </InputAdornment>
                ),
              }}
            />
          </Paper>
          <Paper>
            <Button onClick={() => setState(PageState.IMPRESSUM)}>Impressum</Button>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default LeafletMap;

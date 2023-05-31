import { LatLngBoundsLiteral } from "leaflet";
import {ReactElement, useContext} from "react";
import { MapContainer, SVGOverlay, TileLayer } from "react-leaflet";
import { PageState, PageStateContext } from "../App";
import { Button, Grid, InputAdornment, Paper, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";

const LeafletMap = (): ReactElement => {
    const { setState } = useContext(PageStateContext);

    const position = { lat: 51.505, lng: - 0.09 }
    const bounds: LatLngBoundsLiteral = [
        [51.49, -0.08],
        [51.5, -0.06],
    ]

    return (
        <>
            <Grid container>
                <Grid item xs={9}>
                    <MapContainer center={position} zoom={5} scrollWheelZoom={true}>
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
                <Grid item xs={3} spacing={3}>
                    <Paper>
                        <TextField fullWidth InputProps={
                            <InputAdornment position="end">
                                <Search></Search>
                            </InputAdornment>
                        }></TextField>
                    </Paper>
                    <Paper>
                        <Button onClick={() => setState(PageState.IMPRESSUM)}>Impressum</Button>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
};

export default LeafletMap;
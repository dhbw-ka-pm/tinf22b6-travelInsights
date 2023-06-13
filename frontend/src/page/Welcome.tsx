import React, {ReactElement, useContext, useEffect, useState} from "react";
import {PageState, PageStateContext} from "../App";
import {Button} from "@mui/material";
import {MapContainer, SVGOverlay, TileLayer} from "react-leaflet";
import {LatLngBoundsLiteral, LatLngLiteral} from "leaflet";

const Welcome = (): ReactElement => {
    const {setState} = useContext(PageStateContext);
    const [searchTerm, setSearchTerm] = useState("");

    const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        // Hier kannst du die Logik für die Suchfunktion implementieren
        // Verwende die Variable searchTerm für die Suchabfrage
        console.log("Search term:", searchTerm);
        // Führe hier den entsprechenden Code aus, um die Suche durchzuführen
    };

    return (

        <>

            {/*Header*/}
            <div className="headerLandingPage">
                <img id="logo" src="logoTravelInsights.png"/>
            </div>
            <div className="blurFilter">
                <div className="searchBar">

                    <input type="text" value={searchTerm} onChange={handleInputChange}
                           placeholder="Wohin geht es als nächstes?"/>
                    <Button onClick={handleSearch}>Search</Button>
                </div>
            </div>

            {/*Mitte*/}
            <div className="worldBackground"></div>
            
            {/*Footer*/}
            <footer className="footerLandingPage">
                <Button onClick={() => setState(PageState.MAP)}>to Map</Button>
            </footer>
        </>
    );
};

export default Welcome;

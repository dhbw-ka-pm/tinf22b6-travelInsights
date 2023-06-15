import React, {type ReactElement, useState} from "react";
import {Button} from "@mui/material";
import { Link } from "react-router-dom";

const Welcome = (): ReactElement => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) : void => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () : void => {
        console.log("Search term:", searchTerm);
    };

    return (
        <>
            {/* Header */}
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

            {/* Mitte */}
            <div className="worldBackground"></div>
            
            {/* Footer */}
            <footer className="footerLandingPage">
                <Button component={Link} to={'map/browse'}>Browse Map</Button>
            </footer>
        </>
    );
};

export default Welcome;

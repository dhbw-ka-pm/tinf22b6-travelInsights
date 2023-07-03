import React, {type ReactElement, useState} from "react";
import {Button, IconButton, InputAdornment, Paper, TextField} from "@mui/material";
import { Link } from "react-router-dom";
import { Search } from "@mui/icons-material";

const Welcome = (): ReactElement => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>
      ): void => {
        if (event.key === 'Enter') {
          window.location.href = '/map/' + searchTerm
        }
      };
    

    return (
        <>
            {/* Header */}
            <div className="headerLandingPage">
                <img id="logo" src="Logo_bigger.png" alt={"TravelInsights Logo"}/>
            </div>
            <div className="blurFilter">
                <div className="searchBar">
                    <Paper>
                        <TextField 
                            sx={{width:'40vw'}}
                            value={searchTerm} 
                            onKeyDown={handleKeyDown}
                            onChange={(event) => {setSearchTerm(event.target.value)}}
                            placeholder="Wohin geht es als nächstes?"
                            InputProps={{
                                endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton component={Link} to={'/map/' + searchTerm}>
                                    <Search />
                                    </IconButton>
                                </InputAdornment>
                                )
                            }}/>
                    </Paper>
                </div>
            </div>

            {/* Mitte */}
            <div className = "container">
            <div className="worldBackground"></div>
            </div>
            
            {/* Footer */}
            <footer className="footerLandingPage">
                <Button component={Link} to={'map/browse'}>Browse Map</Button>
            </footer>
        </>
    );
};

export default Welcome;

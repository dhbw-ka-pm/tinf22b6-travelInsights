import React, {type ReactElement, useState} from "react";
import {Box, IconButton, InputAdornment, Paper, TextField, useTheme} from "@mui/material";
import { Link } from "react-router-dom";
import { Search } from "@mui/icons-material";

const Welcome = (): ReactElement => {
    const [searchTerm, setSearchTerm] = useState("");
    const theme = useTheme();

    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>
      ): void => {
        if (event.key === 'Enter') {
          window.location.href = '/map/' + (searchTerm === '' ? 'Worldwide' : searchTerm);
        }
      };

    return (
        <>
            {/* Header */}
            <Box display='flex' sx={{backgroundColor: theme.palette.primary.main, width:"100%", height:"15vh", justifyContent:"center"}}>
                <Box component="img" src="Logo_bigger.png" alt={"TravelInsights Logo"} sx={{height:"15vh"}}></Box>
            </Box>

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
                                    <IconButton component={Link} to={'/map/' + (searchTerm === '' ? 'Worldwide' : searchTerm)}>
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
            <Box display='flex' sx={{backgroundColor: theme.palette.primary.main, width:"100%", height:"15vh", justifyContent:"center"}}/>
        </>
    );
};

export default Welcome;

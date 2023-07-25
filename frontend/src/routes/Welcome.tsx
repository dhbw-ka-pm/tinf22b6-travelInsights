import React, { type ReactElement } from "react";
import { Box, Paper, useTheme } from "@mui/material";
import CountrySelect from "../components/CountrySelect";

const Welcome = (): ReactElement => {
    const theme = useTheme();

    return (
        <>
            {/* Header */}
            <Box display='flex' sx={{ backgroundColor: theme.palette.primary.main, width: "100%", height: "15vh", justifyContent: "center" }}>
                <Box component="img" src="logo500.png" alt={"TravelInsights Logo"} sx={{ height: "15vh" }}></Box>
            </Box>

            <div className="blurFilter">
                <div className="searchBar">
                    <Paper sx={{ width: '40vw' }} >
                        <CountrySelect />
                    </Paper>
                </div>
            </div>

            {/* Mitte */}
            <div className="container">
                <div className="worldBackground"></div>
            </div>

            {/* Footer */}
            <Box display='flex' sx={{ backgroundColor: theme.palette.primary.main, width: "100%", height: "15vh", justifyContent: "center" }} />
        </>
    );
};

export default Welcome;

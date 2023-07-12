import React from 'react';
import {Link, useRouteError} from 'react-router-dom';
import {theme} from "./theme";
import {Box} from "@mui/material";
import Button from "@mui/material/Button";

export default function ErrorPage(): React.ReactElement {
  const error : any = useRouteError();

  return <>
    {/* Header */}
    <Box display='flex' sx={{backgroundColor: theme.palette.primary.main, width:"100%", height:"15vh", justifyContent:"center"}}>
      <Box component="img" src="Logo_bigger.png" alt={"TravelInsights Logo"} sx={{height:"15vh"}}></Box>
    </Box>

    <div className="blurFilter">
      <div style={{
        textAlign: "center",
        color: "white",
        fontSize: "5vh",
        textShadow: "0 0 1vh #000"
      }}>
        <h1 style={{fontSize: "10vh"}}>ERROR {error.status}</h1>
        {error.statusText} {error.data}
        <br/><br/>
        <Button component={Link} to={""} sx={{color: theme.palette.primary.main, backgroundColor: "white", textShadow: "none", "&:hover": {backgroundColor: "lightgray"}}}>
          Back to home
        </Button>
      </div>
    </div>

    {/* Mitte */}
    <div className="container">
      <div className="worldBackground"></div>
    </div>

    {/* Footer */}
    <Box display='flex' sx={{backgroundColor: theme.palette.primary.main, width:"100%", height:"15vh", justifyContent:"center"}}/>
  </>;
}
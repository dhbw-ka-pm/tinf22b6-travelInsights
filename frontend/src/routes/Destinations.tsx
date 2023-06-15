import * as React from 'react';
import Typography from '@mui/material/Typography';
import ResponsiveAppBar from '../components/AppBar';

const Destinations = (): React.ReactElement => {
  return (
    <>
      <ResponsiveAppBar />
      <Typography>Destinations</Typography>
    </>
  );
};

export default Destinations;

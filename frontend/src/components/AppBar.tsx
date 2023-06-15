import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { Link } from 'react-router-dom';

function ResponsiveAppBar(): React.ReactElement {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Button>
            <FlightTakeoffIcon
              sx={{ color: 'white', display: 'flex', mr: 1 }}
            />
            <Link to={'/'}>
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.2rem',
                  color: 'white',
                  textDecoration: 'none'
                }}
              >
                Travel Insights
              </Typography>
            </Link>
            <Link to={'/'}>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.2rem',
                  color: 'white',
                  textDecoration: 'none'
                }}
              >
                TI
              </Typography>
            </Link>
          </Button>
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <Link to={'/destinations'}>
              <Button
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Reiseziele
              </Button>
            </Link>
            <Link to={'/impressum'}>
              <Button
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Impressum
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;

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
          <Button component={Link} to={'/'}>
            <FlightTakeoffIcon
              sx={{ color: 'white', display: 'flex', mr: 1 }}
            />
            <Typography
              variant="h6"
              noWrap
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
            <Typography
              variant="h6"
              noWrap
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
          </Button>
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <Button component={Link} to={'/destinations'}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Reiseziele
            </Button>
            <Button component={Link} to={'/impressum'}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Impressum
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;

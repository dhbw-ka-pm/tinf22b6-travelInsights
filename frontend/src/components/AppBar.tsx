import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { useContext } from 'react';
import { PageState, PageStateContext } from '../App';

function ResponsiveAppBar(): React.ReactElement {
  const { setState } = useContext(PageStateContext);
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Button>
            <FlightTakeoffIcon
              sx={{ color: 'white', display: 'flex', mr: 1 }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              onClick={() => {
                setState(PageState.WELCOME);
              }}
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
          </Button>
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <Button
              onClick={() => {
                setState(PageState.DESTINATIONS);
              }}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Reiseziele
            </Button>
            <Button
              onClick={() => {
                setState(PageState.IMPRESSUM);
              }}
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

import createTheme, { type ThemeOptions } from "@mui/material/styles/createTheme";

 const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#272a53',
    },
    secondary: {
      main: '#f50057',
    },
  },
};
export const theme = createTheme(themeOptions)

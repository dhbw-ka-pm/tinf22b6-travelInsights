import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Welcome from './routes/Welcome';
import ErrorPage from './error-page';
import LeafletMap from './routes/LeafletMap';
import Impressum from './routes/Impressum';
import { ThemeProvider } from '@emotion/react';
import {theme} from './theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Welcome />,
    errorElement: <ErrorPage />
  },
  {
    path: 'map/:searchValue',
    element: <LeafletMap />,
    loader: async ({ params }) => {
      if (params.searchValue !== null) {
        return params.searchValue;
      } else {
        return 'Worldwide';
      }
    }
  },
  {
    path: 'impressum',
    element: <Impressum />
  }
]);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);

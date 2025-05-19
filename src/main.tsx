import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router/routes';
import { GreenhouseProvider } from './features/greenhouseSetup/GreenhouseContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GreenhouseProvider>
      <RouterProvider router={router} />
    </GreenhouseProvider>
  </React.StrictMode>
);

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import AppRoutes from './routes/AppRoutes';
import ScrollToTop from './components/ScrollToTop';

import { DataProvider } from './context/DataContext';

function App() {
  return (
    <HelmetProvider>
      <DataProvider>
        <BrowserRouter>
          <ScrollToTop />
          <AppRoutes />
        </BrowserRouter>
      </DataProvider>
    </HelmetProvider>
  );
}

export default App;

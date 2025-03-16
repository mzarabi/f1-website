import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import NavBar from './layouts/Navbar/NavBar';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import './index.css';

// Lazy load components
const HomePage = React.lazy(() => import('./pages/Home/HomePage'));
const Drivers = React.lazy(() => import('./pages/Drivers/Drivers'));
const DriverStandingsPage = React.lazy(() => import('./pages/DriverStandings/DriverStandingsPage'));
const ConstructorStandingsPage = React.lazy(() => import('./pages/ConstructorStandings/ConstructorStandingsPage'));
const SchedulePage = React.lazy(() => import('./pages/Schedule/SchedulePage'));

// Loading fallback component
const LoadingFallback = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="60vh"
  >
    <CircularProgress sx={{ color: '#b40600' }} />
  </Box>
);

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <NavBar />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/drivers-standings" element={<DriverStandingsPage />} />
          <Route path="/constructor-standings" element={<ConstructorStandingsPage />} />
          <Route path="/constructors" element={<div>Constructors Page</div>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;

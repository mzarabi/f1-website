import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import NavBar from './layouts/Navbar/NavBar';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import './index.css';
import StandingsPage from './pages/Standings/StandingsPage';

const HomePage = React.lazy(() => import('./pages/Home/HomePage'));
const DriversPage = React.lazy(() => import('./pages/Drivers/DriversPage'));
const SchedulePage = React.lazy(() => import('./pages/Schedule/SchedulePage'));
const RaceDetailPage = React.lazy(() => import('./pages/RaceDetail/RaceDetailPage'));
const ConstructorsPage = React.lazy(() => import('./pages/Constructors/ConstructorsPage'));

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
          <Route path="/race/:round" element={<RaceDetailPage />} />
          <Route path="/drivers" element={<DriversPage />} />
          <Route path="/teams" element={<ConstructorsPage />} />
          <Route path="/standings" element={<StandingsPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;

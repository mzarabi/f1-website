import React from 'react';
import { useDrivers } from '../../hooks/useDrivers';
import LazyImage from '../common/LazyImage';
import { Skeleton, Grid } from '@mui/material';
import styles from './DriverGrid.module.css';
import driverPhotos from '../../data/driverPhotos';

const DriverGrid: React.FC = () => {
  const { data: drivers, isLoading, error } = useDrivers();

  const getDriverImage = (driverId: string) => {
    return driverPhotos[driverId] || '';
  };

  if (isLoading) {
    return (
      <div className={styles.gridContainer}>
        <Grid container spacing={3}>
          {[...Array(20)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <div className={styles.driverCard}>
                <Skeleton variant="rectangular" height={200} sx={{ borderRadius: '8px' }} />
                <div className={styles.driverInfo}>
                  <Skeleton width="60%" height={24} />
                  <Skeleton width="80%" height={28} />
                  <Skeleton width="40%" height={24} />
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }

  if (error) {
    return <div>Error loading drivers: {error.message}</div>;
  }

  if (!drivers) {
    return null;
  }

  return (
    <div className={styles.gridContainer}>
      <Grid container spacing={3}>
        {drivers.map((driver) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={driver.driverId}>
            <div className={styles.driverCard}>
              <LazyImage
                src={getDriverImage(driver.driverId)}
                alt={`${driver.givenName} ${driver.familyName}`}
                className={styles.driverImage}
              />
              <div className={styles.driverInfo}>
                <div className={styles.driverFirstName}>{driver.givenName}</div>
                <div className={styles.driverLastName}>{driver.familyName}</div>
                <div className={styles.driverNumber}>#{driver.permanentNumber}</div>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default DriverGrid; 
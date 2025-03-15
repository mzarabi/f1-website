import React from 'react';
import DriverGrid from '../../components/DriverGrid/DriverGrid';
import styles from './Drivers.module.css';

const Drivers: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className={styles.driversPage}>
      <div className={styles.pageHeader}>
        <h1>F1 Drivers {currentYear}</h1>
      </div>
      <DriverGrid />
    </div>
  );
};

export default Drivers; 
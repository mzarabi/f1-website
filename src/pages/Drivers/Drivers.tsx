import React from 'react';
import DriverGrid from '../../components/DriverGrid/DriverGrid';
import styles from './Drivers.module.css';
import sharedStyles from '../../styles/shared.module.css';

const Drivers: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className={sharedStyles.pageBackground}>
      <div className={styles.driversPage}>
        <div className={styles.pageHeader}>
          <h1>F1 Drivers {currentYear}</h1>
        </div>
        <DriverGrid />
      </div>
    </div>
  );
};

export default Drivers; 
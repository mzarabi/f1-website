import React from 'react';
import DriverStandings from '../../components/DriverStandings/DriverStandings';
import styles from './DriverStandingsPage.module.css';
import sharedStyles from '../../styles/shared.module.css';

const DriverStandingsPage: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className={sharedStyles.pageBackground}>
      <div className={styles.standingsPage}>
        <div className={styles.pageHeader}>
          <h1>Driver Standings {currentYear}</h1>
        </div>
        <DriverStandings />
      </div>
    </div>
  );
};

export default DriverStandingsPage; 
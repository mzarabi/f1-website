import React from 'react';
import ConstructorStandings from '../../components/ConstructorStandings/ConstructorStandings';
import styles from './ConstructorStandingsPage.module.css';
import sharedStyles from '../../styles/shared.module.css';

const ConstructorStandingsPage: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className={sharedStyles.pageBackground}>
      <div className={styles.standingsPage}>
        <div className={styles.pageHeader}>
          <h1>Constructor Standings {currentYear}</h1>
        </div>
        <ConstructorStandings />
      </div>
    </div>
  );
};

export default ConstructorStandingsPage; 
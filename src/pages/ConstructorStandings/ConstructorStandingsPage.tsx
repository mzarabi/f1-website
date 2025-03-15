import React from 'react';
import ConstructorStandings from '../../components/ConstructorStandings/ConstructorStandings';
import styles from './ConstructorStandingsPage.module.css';

const ConstructorStandingsPage: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className={styles.standingsPage}>
      <div className={styles.pageHeader}>
        <h1>F1 Constructor Standings {currentYear}</h1>
      </div>
      <ConstructorStandings />
    </div>
  );
};

export default ConstructorStandingsPage; 
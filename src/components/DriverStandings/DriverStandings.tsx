import React from 'react';
import { useDriverStandings } from '../../hooks/useDriverStandings';
import styles from './DriverStandings.module.css';

const DriverStandings: React.FC = () => {
  const { data: standings, isLoading, error } = useDriverStandings();

  if (isLoading) {
    return <div>Loading standings...</div>;
  }

  if (error) {
    return <div>Error loading standings: {error.message}</div>;
  }

  if (!standings) {
    return null;
  }

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Pos</th>
            <th>Driver</th>
            <th>Team</th>
            <th>Pts</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((standing, index) => (
            <tr key={standing.Driver.familyName}>
              <td>{index + 1}</td>
              <td>{standing.Driver.familyName}</td>
              <td>{standing.Constructors[0]?.name}</td>
              <td>{standing.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DriverStandings; 
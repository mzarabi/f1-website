import React from 'react';
import { useConstructorStandings } from '../../hooks/useConstructorStandings';
import styles from './ConstructorStandings.module.css';

const ConstructorStandings: React.FC = () => {
  const { data: standings, isLoading, error } = useConstructorStandings();

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
            <th>Team</th>
            <th>Nationality</th>
            <th>Pts</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((standing) => (
            <tr key={standing.position}>
              <td>{standing.position}</td>
              <td>{standing.Constructor.name}</td>
              <td>{standing.Constructor.nationality}</td>
              <td>{standing.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConstructorStandings; 
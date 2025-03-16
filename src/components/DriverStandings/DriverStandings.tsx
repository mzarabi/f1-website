import React from 'react';
import { useDriverStandings } from '../../hooks/useDriverStandings';
import { teamColors } from '../../utils/teamColors';
import styles from './DriverStandings.module.css';

const DriverStandings: React.FC = () => {
  const { data: standings, isLoading, error } = useDriverStandings();

  if (isLoading) {
    return <div className={styles.loadingText}>Loading standings...</div>;
  }

  if (error) {
    return <div className={styles.errorText}>Error loading standings: {error.message}</div>;
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
          {standings.map((standing, index) => {
            const teamName = standing.Constructors[0]?.name || '';
            const teamColor = teamColors[teamName] || '#ffffff';
            
            return (
              <tr key={standing.Driver.familyName}>
                <td>{index + 1}</td>
                <td>{standing.Driver.givenName} {standing.Driver.familyName}</td>
                <td>
                  <span 
                    className={styles.teamName}
                    style={{ 
                      borderLeft: `4px solid ${teamColor}`,
                      paddingLeft: '10px'
                    }}
                  >
                    {teamName}
                  </span>
                </td>
                <td>{standing.points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DriverStandings; 
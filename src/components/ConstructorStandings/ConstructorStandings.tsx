import React from 'react';
import { useConstructorStandings } from '../../hooks/useConstructorStandings';
import { teamColors } from '../../utils/teamColors';
import styles from './ConstructorStandings.module.css';

const ConstructorStandings: React.FC = () => {
  const { data: standings, isLoading, error } = useConstructorStandings();

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
            <th>Team</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((standing, index) => {
            const teamName = standing.Constructor.name;
            const teamColor = teamColors[teamName] || '#ffffff';
            
            return (
              <tr key={standing.Constructor.name}>
                <td>{index + 1}</td>
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

export default ConstructorStandings; 
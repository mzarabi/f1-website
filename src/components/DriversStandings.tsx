import React from 'react';
import { useDrivers } from '../hooks/useDrivers';

const DriversStandings: React.FC = () => {
  const { data: drivers, isLoading, error } = useDrivers();

  if (isLoading) {
    return <div>Loading drivers...</div>;
  }

  if (error) {
    return <div>Error loading drivers: {error.message}</div>;
  }

  return (
    <div className="drivers-list">
      <h1>Drivers Standings</h1>
      <div className="drivers-grid">
        {drivers?.map((driver) => (
          <div key={driver.driverId} className="driver-card">
            <div className="driver-number">#{driver.permanentNumber}</div>
            <div className="driver-name">
              {driver.givenName} {driver.familyName}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DriversStandings; 
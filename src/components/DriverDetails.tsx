import React from 'react';
import { useParams } from 'react-router-dom';

const DriverDetails: React.FC = () => {
  const { id } = useParams();
  
  return (
    <div>
      <h1>Driver Details - {id}</h1>
    </div>
  );
};

export default DriverDetails; 
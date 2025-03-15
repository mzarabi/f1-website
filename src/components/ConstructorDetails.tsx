import React from 'react';
import { useParams } from 'react-router-dom';

const ConstructorDetails: React.FC = () => {
  const { id } = useParams();
  
  return (
    <div>
      <h1>Constructor Details - {id}</h1>
    </div>
  );
};

export default ConstructorDetails; 
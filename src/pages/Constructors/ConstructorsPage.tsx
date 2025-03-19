import React from 'react';
import { Container, Typography } from '@mui/material';
import ConstructorGrid from '../../components/ConstructorGrid/ConstructorGrid';
import styles from './Constructors.module.css';
import sharedStyles from '../../styles/shared.module.css';

const ConstructorsPage: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className={sharedStyles.pageBackground}>
      <Container maxWidth="xl" sx={{ py: 5 }}>
        <Typography variant="h2" className={styles.pageTitle}>
          F1 Teams {currentYear}
        </Typography>
        <ConstructorGrid />
      </Container>
    </div>
  );
};

export default ConstructorsPage; 
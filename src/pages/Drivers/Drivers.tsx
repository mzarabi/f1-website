import React from 'react';
import { Container, Typography } from '@mui/material';
import DriverGrid from '../../components/DriverGrid/DriverGrid';
import styles from './Drivers.module.css';
import sharedStyles from '../../styles/shared.module.css';

const Drivers: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className={sharedStyles.pageBackground}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h2" className={styles.pageTitle}>
          F1 Drivers {currentYear}
        </Typography>
        <DriverGrid />
      </Container>
    </div>
  );
};

export default Drivers; 
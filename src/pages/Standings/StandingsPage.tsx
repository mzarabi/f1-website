import React, { useState } from 'react';
import { Container, Typography, Box, Tabs, Tab } from '@mui/material';
import { useDriverStandings } from '../../hooks/useDriverStandings';
import { useConstructorStandings } from '../../hooks/useConstructorStandings';
import DriverStandings from '../../components/DriverStandings/DriverStandings';
import ConstructorStandings from '../../components/ConstructorStandings/ConstructorStandings';
import styles from './StandingsPage.module.css';
import sharedStyles from '../../styles/shared.module.css';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`standings-tabpanel-${index}`}
      aria-labelledby={`standings-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
};

const StandingsPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const { isLoading: isDriverLoading } = useDriverStandings();
  const { isLoading: isConstructorLoading } = useConstructorStandings();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (isDriverLoading || isConstructorLoading) {
    return (
      <div className={sharedStyles.pageBackground}>
        <Container maxWidth="xl">
          <Typography variant="h4" className={styles.loadingText}>
            Loading standings...
          </Typography>
        </Container>
      </div>
    );
  }

  return (
    <div className={sharedStyles.pageBackground}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h2" className={styles.pageTitle}>
          2025 Championship Standings
        </Typography>
        
        <Box>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            className={styles.tabs}
            textColor="inherit"
            TabIndicatorProps={{
              style: {
                backgroundColor: '#ff1801'
              }
            }}
          >
            <Tab label="Driver Standings" className={styles.tab} />
            <Tab label="Constructor Standings" className={styles.tab} />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <DriverStandings />
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <ConstructorStandings />
        </TabPanel>
      </Container>
    </div>
  );
};

export default StandingsPage; 
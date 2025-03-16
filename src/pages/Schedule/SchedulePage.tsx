import React from 'react';
import { Container, Typography, Grid, Box, Paper } from '@mui/material';
import { useRaceSchedule } from '../../hooks/useRaceSchedule';
import styles from './SchedulePage.module.css';
import sharedStyles from '../../styles/shared.module.css';

const SchedulePage: React.FC = () => {
  const { data: races, isLoading } = useRaceSchedule();

  const getRaceStatus = (raceDate: string, raceTime: string) => {
    const now = new Date();
    const raceDateTime = new Date(`${raceDate}T${raceTime}`);
    
    if (raceDateTime < now) {
      return 'past';
    }
    
    // Find the next race
    const futureRaces = races?.filter(race => {
      const raceDT = new Date(`${race.date}T${race.time}`);
      return raceDT > now;
    }) || [];
    
    if (futureRaces.length > 0 && 
        raceDate === futureRaces[0].date && 
        raceTime === futureRaces[0].time) {
      return 'next';
    }
    
    return 'future';
  };

  const formatRaceDate = (date: string, time: string) => {
    const raceDate = new Date(`${date}T${time}`);
    
    const localDate = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    }).format(raceDate);

    return localDate;
  };

  if (isLoading) {
    return (
      <div className={sharedStyles.pageBackground}>
        <Container maxWidth="xl">
          <Typography variant="h4" className={styles.loadingText}>
            Loading race schedule...
          </Typography>
        </Container>
      </div>
    );
  }

  return (
    <div className={sharedStyles.pageBackground}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h2" className={styles.pageTitle}>
          2025 Race Schedule
        </Typography>
        <Grid 
          container 
          spacing={2}
          justifyContent="space-between"
          alignItems="stretch"
        >
          {races?.map((race) => {
            const raceStatus = getRaceStatus(race.date, race.time);
            return (
              <Grid 
                item 
                xs={12} 
                sm={5.9} 
                lg={3.9} 
                className={styles.gridItem}
                key={race.round}
              >
                <Paper 
                  className={`${styles.raceCard} ${styles[`race${raceStatus.charAt(0).toUpperCase() + raceStatus.slice(1)}`]}`} 
                  elevation={0}
                >
                  <Typography variant="h4" className={styles.raceName}>
                    {race.raceName}
                  </Typography>
                  <Typography variant="h6" className={styles.circuitName}>
                    {race.Circuit.circuitName}
                  </Typography>
                  <Typography variant="body1" className={styles.location}>
                    {race.Circuit.Location.locality}, {race.Circuit.Location.country}
                  </Typography>
                  
                  <Box className={styles.sessionsList}>
                    <Box className={styles.sessionItem}>
                      <Typography variant="body2" className={styles.sessionLabel}>
                        Practice 1
                      </Typography>
                      <Typography variant="body1" className={styles.sessionTime}>
                        {formatRaceDate(race.FirstPractice.date, race.FirstPractice.time)}
                      </Typography>
                    </Box>

                    {race.SecondPractice && (
                      <Box className={styles.sessionItem}>
                        <Typography variant="body2" className={styles.sessionLabel}>
                          Practice 2
                        </Typography>
                        <Typography variant="body1" className={styles.sessionTime}>
                          {formatRaceDate(race.SecondPractice.date, race.SecondPractice.time)}
                        </Typography>
                      </Box>
                    )}

                    {race.ThirdPractice && (
                      <Box className={styles.sessionItem}>
                        <Typography variant="body2" className={styles.sessionLabel}>
                          Practice 3
                        </Typography>
                        <Typography variant="body1" className={styles.sessionTime}>
                          {formatRaceDate(race?.ThirdPractice?.date, race?.ThirdPractice?.time)}
                        </Typography>
                      </Box>
                    )}

                    {race.SprintQualifying && (
                      <Box className={styles.sessionItem}>
                        <Typography variant="body2" className={styles.sessionLabel}>
                          Sprint Qualifying
                        </Typography>
                        <Typography variant="body1" className={styles.sessionTime}>
                          {formatRaceDate(race.SprintQualifying.date, race.SprintQualifying.time)}
                        </Typography>
                      </Box>
                    )}

                    {race.Sprint && (
                      <Box className={styles.sessionItem}>
                        <Typography variant="body2" className={styles.sessionLabel}>
                          Sprint
                        </Typography>
                        <Typography variant="body1" className={styles.sessionTime}>
                          {formatRaceDate(race.Sprint.date, race.Sprint.time)}
                        </Typography>
                      </Box>
                    )}

                    <Box className={styles.sessionItem}>
                      <Typography variant="body2" className={styles.sessionLabel}>
                        Qualifying
                      </Typography>
                      <Typography variant="body1" className={styles.sessionTime}>
                        {formatRaceDate(race.Qualifying.date, race.Qualifying.time)}
                      </Typography>
                    </Box>

                    <Box className={styles.sessionItem}>
                      <Typography variant="body2" className={styles.sessionLabel}>
                        Race
                      </Typography>
                      <Typography variant="body1" className={styles.sessionTime}>
                        {formatRaceDate(race.date, race.time)}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
};

export default SchedulePage; 
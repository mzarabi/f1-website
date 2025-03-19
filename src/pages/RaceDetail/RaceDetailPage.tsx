import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Grid, 
  Button,
  CircularProgress
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRaceSchedule } from '../../hooks/useRaceSchedule';
import styles from './RaceDetailPage.module.css';
import sharedStyles from '../../styles/shared.module.css';

const RaceDetailPage: React.FC = () => {
  const { round } = useParams<{ round: string }>();
  const navigate = useNavigate();
  const { data: races, isLoading } = useRaceSchedule();
  const [race, setRace] = useState<any>(null);

  useEffect(() => {
    if (races && round) {
      const foundRace = races.find(r => r.round === round);
      if (foundRace) {
        setRace(foundRace);
      }
    }
  }, [races, round]);

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

  const getRaceStatus = (raceDate: string, raceTime: string) => {
    const now = new Date();
    const raceDateTime = new Date(`${raceDate}T${raceTime}`);
    
    if (raceDateTime < now) {
      return 'past';
    }
    
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

  if (isLoading || !race) {
    return (
      <div className={sharedStyles.pageBackground}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress sx={{ color: '#ff1801' }} />
            <Typography variant="h5" className={styles.loadingText} sx={{ ml: 2 }}>
              Loading race information...
            </Typography>
          </Box>
        </Container>
      </div>
    );
  }

  const raceStatus = getRaceStatus(race.date, race.time);

  return (
    <div className={sharedStyles.pageBackground}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate('/schedule')}
          className={styles.backButton}
        >
          Back to Schedule
        </Button>

        <Paper className={`${styles.raceDetailCard} ${styles[`race${raceStatus.charAt(0).toUpperCase() + raceStatus.slice(1)}`]}`}>
          <Box className={styles.raceHeader}>
            <Typography variant="h2" className={styles.raceName}>
              {race.raceName}
            </Typography>
            <Typography variant="h4" className={styles.circuitName}>
              {race.Circuit.circuitName}
            </Typography>
            <Typography variant="h6" className={styles.location}>
              {race.Circuit.Location.locality}, {race.Circuit.Location.country}
            </Typography>
          </Box>

          <Grid container spacing={4} className={styles.raceContentContainer}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" className={styles.sectionTitle}>Race Weekend Schedule</Typography>
              
              <Box className={styles.sessionsListContainer}>
                {race.FirstPractice && (
                  <Paper className={styles.sessionCard}>
                    <Typography variant="h6" className={styles.sessionTitle}>Practice 1</Typography>
                    <Typography className={styles.sessionDate}>{formatRaceDate(race.FirstPractice.date, race.FirstPractice.time)}</Typography>
                  </Paper>
                )}

                {race.SecondPractice && (
                  <Paper className={styles.sessionCard}>
                    <Typography variant="h6" className={styles.sessionTitle}>Practice 2</Typography>
                    <Typography className={styles.sessionDate}>{formatRaceDate(race.SecondPractice.date, race.SecondPractice.time)}</Typography>
                  </Paper>
                )}

                {race.ThirdPractice && (
                  <Paper className={styles.sessionCard}>
                    <Typography variant="h6" className={styles.sessionTitle}>Practice 3</Typography>
                    <Typography className={styles.sessionDate}>{formatRaceDate(race.ThirdPractice.date, race.ThirdPractice.time)}</Typography>
                  </Paper>
                )}

                {race.SprintQualifying && (
                  <Paper className={styles.sessionCard}>
                    <Typography variant="h6" className={styles.sessionTitle}>Sprint Qualifying</Typography>
                    <Typography className={styles.sessionDate}>{formatRaceDate(race.SprintQualifying.date, race.SprintQualifying.time)}</Typography>
                  </Paper>
                )}

                {race.Sprint && (
                  <Paper className={styles.sessionCard}>
                    <Typography variant="h6" className={styles.sessionTitle}>Sprint</Typography>
                    <Typography className={styles.sessionDate}>{formatRaceDate(race.Sprint.date, race.Sprint.time)}</Typography>
                  </Paper>
                )}

                <Paper className={styles.sessionCard}>
                  <Typography variant="h6" className={styles.sessionTitle}>Qualifying</Typography>
                  <Typography className={styles.sessionDate}>{formatRaceDate(race.Qualifying.date, race.Qualifying.time)}</Typography>
                </Paper>

                <Paper className={`${styles.sessionCard} ${styles.raceSession}`}>
                  <Typography variant="h6" className={styles.sessionTitle}>Race</Typography>
                  <Typography className={styles.sessionDate}>{formatRaceDate(race.date, race.time)}</Typography>
                </Paper>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h4" className={styles.sectionTitle}>Circuit Information</Typography>
              
              <Box className={styles.circuitMapContainer}>
                {race.Circuit.circuitId && (
                  <img 
                    src={`/assets/circuits/${race.Circuit.circuitId}.png`} 
                    alt={`${race.Circuit.circuitName} layout`}
                    className={styles.circuitMap}
                    onError={(e) => {
                      e.currentTarget.src = '/assets/circuits/default-circuit.png';
                    }}
                  />
                )}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default RaceDetailPage; 
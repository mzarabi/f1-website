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

interface RaceSession {
  date: string;
  time: string;
}

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

          <Box className={styles.sessionContainer}>
            <Typography variant="h4" className={styles.sectionTitle}>Race Weekend Schedule</Typography>
            
            <Grid container spacing={3}>
              {race.FirstPractice && (
                <Grid item xs={12} sm={6} md={4}>
                  <Paper className={styles.sessionCard}>
                    <Typography variant="h6" className={styles.sessionTitle}>Practice 1</Typography>
                    <Typography className={styles.sessionDate}>{formatRaceDate(race.FirstPractice.date, race.FirstPractice.time)}</Typography>
                  </Paper>
                </Grid>
              )}

              {race.SecondPractice && (
                <Grid item xs={12} sm={6} md={4}>
                  <Paper className={styles.sessionCard}>
                    <Typography variant="h6" className={styles.sessionTitle}>Practice 2</Typography>
                    <Typography className={styles.sessionDate}>{formatRaceDate(race.SecondPractice.date, race.SecondPractice.time)}</Typography>
                  </Paper>
                </Grid>
              )}

              {race.ThirdPractice && (
                <Grid item xs={12} sm={6} md={4}>
                  <Paper className={styles.sessionCard}>
                    <Typography variant="h6" className={styles.sessionTitle}>Practice 3</Typography>
                    <Typography className={styles.sessionDate}>{formatRaceDate(race.ThirdPractice.date, race.ThirdPractice.time)}</Typography>
                  </Paper>
                </Grid>
              )}

              {race.SprintQualifying && (
                <Grid item xs={12} sm={6} md={4}>
                  <Paper className={styles.sessionCard}>
                    <Typography variant="h6" className={styles.sessionTitle}>Sprint Qualifying</Typography>
                    <Typography className={styles.sessionDate}>{formatRaceDate(race.SprintQualifying.date, race.SprintQualifying.time)}</Typography>
                  </Paper>
                </Grid>
              )}

              {race.Sprint && (
                <Grid item xs={12} sm={6} md={4}>
                  <Paper className={styles.sessionCard}>
                    <Typography variant="h6" className={styles.sessionTitle}>Sprint</Typography>
                    <Typography className={styles.sessionDate}>{formatRaceDate(race.Sprint.date, race.Sprint.time)}</Typography>
                  </Paper>
                </Grid>
              )}

              <Grid item xs={12} sm={6} md={4}>
                <Paper className={styles.sessionCard}>
                  <Typography variant="h6" className={styles.sessionTitle}>Qualifying</Typography>
                  <Typography className={styles.sessionDate}>{formatRaceDate(race.Qualifying.date, race.Qualifying.time)}</Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Paper className={`${styles.sessionCard} ${styles.raceSession}`}>
                  <Typography variant="h6" className={styles.sessionTitle}>Race</Typography>
                  <Typography className={styles.sessionDate}>{formatRaceDate(race.date, race.time)}</Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>

          <Box className={styles.circuitInfoContainer}>
            <Typography variant="h4" className={styles.sectionTitle}>Circuit Information</Typography>
            
            <Box className={styles.circuitMapContainer}>
              {race.Circuit.circuitId && (
                <img 
                  src={`/assets/circuits/${race.Circuit.circuitId}.png`} 
                  alt={`${race.Circuit.circuitName} layout`}
                  className={styles.circuitMap}
                  onError={(e) => {
                    // Fallback if image doesn't exist
                    e.currentTarget.src = '/assets/circuits/default-circuit.png';
                  }}
                />
              )}
            </Box>
            
            <Box className={styles.circuitInfo}>
              <Typography variant="body1">
                {/* Circuit details would go here - you could add additional information from an API or static data */}
                Length: 5.303 km<br />
                Number of laps: 58<br />
                Race distance: 307.574 km<br />
                First Grand Prix: 1950
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default RaceDetailPage; 
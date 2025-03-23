import React from 'react';
import { Container, Typography, Grid, Box, Paper, Chip } from '@mui/material';
import { useRaceSchedule } from '../../hooks/useRaceSchedule';
import { useRaceWinners } from '../../hooks/useRaceWinners';
import { useNavigate } from 'react-router-dom';
import styles from './SchedulePage.module.css';
import sharedStyles from '../../styles/shared.module.css';

const SchedulePage: React.FC = () => {
  const { data: races, isLoading: isScheduleLoading } = useRaceSchedule();
  const { data: raceWinners, isLoading: isWinnersLoading } = useRaceWinners();
  const navigate = useNavigate();

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

  const formatRaceDate = (date: string) => {
    const raceDate = new Date(date);
    
    const localDate = new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
    }).format(raceDate);

    return localDate;
  };

  // Get race winner information by round
  const getRaceWinner = (round: string) => {
    return raceWinners.find(winner => winner.round === round);
  };

  const handleRaceClick = (round: string) => {
    navigate(`/race/${round}`);
  };

  if (isScheduleLoading) {
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
          spacing={3}
        >
          {races?.map((race) => {
            const raceStatus = getRaceStatus(race.date, race.time);
            const winner = raceStatus === 'past' ? getRaceWinner(race.round) : null;
            
            return (
              <Grid 
                item 
                xs={12} 
                sm={6} 
                md={4} 
                lg={4} 
                key={race.round}
              >
                <Paper 
                  className={`${styles.raceCard} ${styles[`race${raceStatus.charAt(0).toUpperCase() + raceStatus.slice(1)}`]}`} 
                  elevation={0}
                  onClick={() => handleRaceClick(race.round)}
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
                  
                  {winner && (
                    <Box className={styles.winnerInfo}>
                      <Chip 
                        label={`Winner: ${winner.winnerName}`} 
                        className={styles.winnerChip}
                        sx={{ 
                          my: 1,
                          backgroundColor: 'rgba(255, 24, 1, 0.9)',
                          color: '#ffffff',
                          fontWeight: 'bold',
                          '& .MuiChip-label': {
                            padding: '0 12px',
                          }
                        }}
                      />
                    </Box>
                  )}
                  
                  <Box className={styles.raceMainDate}>
                    <Typography variant="body2" className={styles.sessionLabel}>
                      ROUND {race.round}
                    </Typography>
                    <Typography variant="body1" className={styles.sessionTime}>
                      {formatRaceDate(race.FirstPractice.date)} - {formatRaceDate(race.date)}
                    </Typography>
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
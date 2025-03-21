import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDriverStandings } from '../../hooks/useDriverStandings';
import { useConstructorStandings } from '../../hooks/useConstructorStandings';
import { useNextRace } from '../../hooks/useNextRace';
import { useRaceResults } from '../../hooks/useRaceResults';
import { teamColors } from '../../utils/teamColors';
import styles from './HomePage.module.css';
import sharedStyles from '../../styles/shared.module.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { data: driverStandings, isLoading: isDriverLoading } = useDriverStandings();
  const { data: constructorStandings, isLoading: isConstructorLoading } = useConstructorStandings();
  const { data: nextRace, isLoading: isRaceLoading } = useNextRace();
  const { data: raceResults, isLoading: isResultsLoading } = useRaceResults();
  
  const isLoading = isDriverLoading || isConstructorLoading || isRaceLoading || isResultsLoading;

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

  const hexToRgb = (hex: string): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return '255, 255, 255';
    return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
  };

  if (isLoading || !driverStandings || !constructorStandings || !nextRace || !raceResults) {
    return null;
  }

  return (
    <div className={sharedStyles.pageBackground}>
      <Box className={styles.hero}>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6} className={styles.heroMainContent}>
              <Box className={styles.heroTextContent}>
                {driverStandings[0] && (
                  <Box 
                    className={styles.currentLeader}
                    style={{
                      background: `linear-gradient(135deg, rgba(${hexToRgb(teamColors[driverStandings[0].Constructors[0]?.name] || '#ffffff')}, 0.15) 0%, rgba(${hexToRgb(teamColors[driverStandings[0].Constructors[0]?.name] || '#ffffff')}, 0.05) 100%)`,
                      borderColor: `rgba(${hexToRgb(teamColors[driverStandings[0].Constructors[0]?.name] || '#ffffff')}, 0.3)`
                    }}
                  >
                    <Typography variant="h6" className={styles.leaderLabel}>
                      Driver Championship Leader
                    </Typography>
                    <Typography variant="h3" className={styles.leaderName}>
                      {driverStandings[0].Driver.givenName} {driverStandings[0].Driver.familyName}
                    </Typography>
                    <Typography 
                      variant="h4" 
                      className={styles.leaderPoints}
                      style={{
                        color: teamColors[driverStandings[0].Constructors[0]?.name] || '#ff1801'
                      }}
                    >
                      {driverStandings[0].points} Points
                    </Typography>
                  </Box>
                )}
                {constructorStandings[0] && (
                  <Box 
                    className={styles.constructorLeader}
                    style={{
                      background: `linear-gradient(135deg, rgba(${hexToRgb(teamColors[constructorStandings[0].Constructor.name] || '#ffffff')}, 0.15) 0%, rgba(${hexToRgb(teamColors[constructorStandings[0].Constructor.name] || '#ffffff')}, 0.05) 100%)`,
                      borderColor: `rgba(${hexToRgb(teamColors[constructorStandings[0].Constructor.name] || '#ffffff')}, 0.3)`
                    }}
                  >
                    <Typography variant="h6" className={styles.leaderLabel}>
                      Constructor Championship Leader
                    </Typography>
                    <Typography variant="h3" className={styles.leaderName}>
                      {constructorStandings[0].Constructor.name}
                    </Typography>
                    <Typography 
                      variant="h4" 
                      className={styles.leaderPoints}
                      style={{
                        color: teamColors[constructorStandings[0].Constructor.name] || '#ff1801'
                      }}
                    >
                      {constructorStandings[0].points} Points
                    </Typography>
                  </Box>
                )}
                <Box className={styles.nextRace}>
                  <Typography variant="h6" className={styles.raceLabel}>
                    Next up
                  </Typography>
                  <Typography variant="h3" className={styles.raceName}>
                    {nextRace.raceName}
                  </Typography>
                  <Box className={styles.raceTimes}>
                    {nextRace.FirstPractice && (
                      <Box>
                        <Typography variant="body2" className={styles.timeLabel}>
                          Practice 1
                        </Typography>
                        <Typography variant="h4" className={styles.raceDate}>
                          {formatRaceDate(nextRace.FirstPractice.date, nextRace.FirstPractice.time)}
                        </Typography>
                      </Box>
                    )}

                    {nextRace.SecondPractice && (
                      <Box>
                        <Typography variant="body2" className={styles.timeLabel}>
                          Practice 2
                        </Typography>
                        <Typography variant="h4" className={styles.raceDate}>
                          {formatRaceDate(nextRace.SecondPractice.date, nextRace.SecondPractice.time)}
                        </Typography>
                      </Box>
                    )}

                    {nextRace.ThirdPractice && (
                      <Box>
                        <Typography variant="body2" className={styles.timeLabel}>
                          Practice 3
                        </Typography>
                        <Typography variant="h4" className={styles.raceDate}>
                          {formatRaceDate(nextRace.ThirdPractice.date, nextRace.ThirdPractice.time)}
                        </Typography>
                      </Box>
                    )}

                    {nextRace.SprintQualifying && (
                      <Box>
                        <Typography variant="body2" className={styles.timeLabel}>
                          Sprint Qualifying
                        </Typography>
                        <Typography variant="h4" className={styles.raceDate}>
                          {formatRaceDate(nextRace.SprintQualifying.date, nextRace.SprintQualifying.time)}
                        </Typography>
                      </Box>
                    )}

                    {nextRace.Sprint && (
                      <Box>
                        <Typography variant="body2" className={styles.timeLabel}>
                          Sprint
                        </Typography>
                        <Typography variant="h4" className={styles.raceDate}>
                          {formatRaceDate(nextRace.Sprint.date, nextRace.Sprint.time)}
                        </Typography>
                      </Box>
                    )}

                    {nextRace.Qualifying && (
                      <Box>
                        <Typography variant="body2" className={styles.timeLabel}>
                          Qualifying
                        </Typography>
                        <Typography variant="h4" className={styles.raceDate}>
                          {formatRaceDate(nextRace.Qualifying.date, nextRace.Qualifying.time)}
                        </Typography>
                      </Box>
                    )}

                    <Box>
                      <Typography variant="body2" className={styles.timeLabel}>
                        Race
                      </Typography>
                      <Typography variant="h4" className={styles.raceDate}>
                        {formatRaceDate(nextRace.date, nextRace.time)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} className={styles.heroMainContent}>
              <Box className={styles.heroTextContent}>
                <Typography variant="h6" className={styles.raceLabel}>
                  Latest Race Results
                </Typography>
                <Typography variant="h3" className={styles.raceName}>
                  {raceResults.raceName}
                </Typography>
                <div className={styles.resultsList}>
                  {raceResults.Results.slice(0, 10).map((result) => (
                    <div 
                      key={result.position} 
                      className={styles.resultItem}
                      style={{
                        borderLeft: `4px solid ${teamColors[result.Constructor.name] || '#ff1801'}`
                      }}
                    >
                      <Typography variant="h6" className={styles.position}>
                        {result.position}
                      </Typography>
                      <Typography variant="body1" className={styles.name}>
                        {result.Driver.givenName} {result.Driver.familyName}
                      </Typography>
                      <Typography variant="body1" className={styles.time}>
                        {result.Time?.time || 'DNF'}
                      </Typography>
                    </div>
                  ))}
                </div>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default HomePage; 
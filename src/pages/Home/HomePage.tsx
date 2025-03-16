import React from 'react';
import { Box, Container, Typography, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PersonIcon from '@mui/icons-material/Person';
import { useDriverStandings } from '../../hooks/useDriverStandings';
import { useConstructorStandings } from '../../hooks/useConstructorStandings';
import { useNextRace } from '../../hooks/useNextRace';
import { useRaceResults } from '../../hooks/useRaceResults';
import { DriverStanding } from '../../types/driverStandings';
import { ConstructorStanding } from '../../types/constructorStandings';
import styles from './HomePage.module.css';
import sharedStyles from '../../styles/shared.module.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { data: driverStandings, isLoading: isDriverLoading } = useDriverStandings();
  const { data: constructorStandings, isLoading: isConstructorLoading } = useConstructorStandings();
  const { data: nextRace, isLoading: isRaceLoading } = useNextRace();
  const { data: raceResults, isLoading: isResultsLoading } = useRaceResults();
  
  const currentYear = new Date().getFullYear();

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

  const quickLinks = [
    {
      title: 'Drivers',
      description: 'View all F1 drivers and their profiles',
      icon: <PersonIcon className={styles.cardIcon} />,
      path: '/drivers'
    },
    {
      title: 'Driver Standings',
      description: `${currentYear} Driver Championship standings`,
      icon: <EmojiEventsIcon className={styles.cardIcon} />,
      path: '/drivers-standings'
    },
    {
      title: 'Constructor Standings',
      description: `${currentYear} Constructor Championship standings`,
      icon: <EmojiEventsIcon className={styles.cardIcon} />,
      path: '/constructor-standings'
    }
  ];

  const handleNavigation = (path: string) => {
    window.scrollTo(0, 0);
    navigate(path);
  };

  return (
    <div className={sharedStyles.pageBackground}>
      <Box className={styles.hero}>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6} className={styles.heroMainContent}>
              <Box className={styles.heroTextContent}>
                <Typography variant="h1" className={styles.heroTitle}>
                  Formula 1 <span className={styles.heroYear}>{currentYear}</span>
                </Typography>
                {!isDriverLoading && driverStandings && driverStandings[0] && (
                  <Box className={styles.currentLeader}>
                    <Typography variant="h6" className={styles.leaderLabel}>
                      Current Championship Leader
                    </Typography>
                    <Typography variant="h3" className={styles.leaderName}>
                      {driverStandings[0].Driver.givenName} {driverStandings[0].Driver.familyName}
                    </Typography>
                    <Typography variant="h4" className={styles.leaderPoints}>
                      {driverStandings[0].points} Points
                    </Typography>
                  </Box>
                )}
                {!isConstructorLoading && constructorStandings && constructorStandings[0] && (
                  <Box className={styles.constructorLeader}>
                    <Typography variant="h6" className={styles.leaderLabel}>
                      Constructor Championship Leader
                    </Typography>
                    <Typography variant="h3" className={styles.leaderName}>
                      {constructorStandings[0].Constructor.name}
                    </Typography>
                    <Typography variant="h4" className={styles.leaderPoints}>
                      {constructorStandings[0].points} Points
                    </Typography>
                  </Box>
                )}
                {!isRaceLoading && nextRace && (
                  <Box className={styles.nextRace}>
                    <Typography variant="h6" className={styles.raceLabel}>
                      Next Race
                    </Typography>
                    <Typography variant="h3" className={styles.raceName}>
                      {nextRace.raceName}
                    </Typography>
                    <Typography variant="body1" className={styles.raceLocation}>
                      {nextRace.Circuit.Location.locality}, {nextRace.Circuit.Location.country}
                    </Typography>
                    <Typography variant="h4" className={styles.raceDate}>
                      {formatRaceDate(nextRace.date, nextRace.time)}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} md={6} className={styles.heroMainContent}>
              {!isResultsLoading && raceResults && (
                <Box className={styles.heroTextContent}>
                  <Typography variant="h6" className={styles.raceLabel}>
                    Latest Race Results
                  </Typography>
                  <Typography variant="h3" className={styles.raceName}>
                    {raceResults.raceName}
                  </Typography>
                  <Typography variant="body1" className={styles.raceLocation}>
                    {raceResults.Circuit.circuitName}
                  </Typography>
                  <div className={styles.resultsList}>
                    {raceResults.Results.slice(0, 10).map((result) => (
                      <div key={result.position} className={styles.resultItem}>
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
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="xl" className={styles.content}>
        <Grid container spacing={{ xs: 3, md: 4 }} className={styles.quickLinks}>
          {quickLinks.map((link) => (
            <Grid item xs={12} md={4} key={link.path}>
              <Paper 
                className={styles.card}
                onClick={() => handleNavigation(link.path)}
              >
                {link.icon}
                <Typography variant="h6" className={styles.cardTitle}>
                  {link.title}
                </Typography>
                <Typography variant="body1" className={styles.cardDescription}>
                  {link.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default HomePage; 
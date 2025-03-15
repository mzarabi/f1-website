import React from 'react';
import { Box, Container, Typography, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PersonIcon from '@mui/icons-material/Person';
import { useDriverStandings } from '../../hooks/useDriverStandings';
import { useConstructorStandings } from '../../hooks/useConstructorStandings';
import { DriverStanding } from '../../types/driverStandings';
import { ConstructorStanding } from '../../types/constructorStandings';
import F1News from '../../components/F1News/F1News';
import styles from './HomePage.module.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { data: driverStandings, isLoading: isDriverLoading } = useDriverStandings();
  const { data: constructorStandings, isLoading: isConstructorLoading } = useConstructorStandings();
  
  const currentYear = new Date().getFullYear();

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

  return (
    <div className={styles.homePage}>
      <Box className={styles.hero}>
        <Container maxWidth="xl">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: { xs: 4, md: 0 } }}>
                <Typography variant="h1" className={styles.heroTitle}>
                  Formula 1
                </Typography>
                <Typography variant="h2" className={styles.heroSubtitle}>
                  Live Standings and Statistics
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                p: 3
              }}>
                <Typography variant="h5" sx={{ 
                  mb: 2, 
                  color: '#ffffff',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Latest F1 News
                </Typography>
                <F1News />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="xl" className={styles.content}>
        {/* Quick Links Section */}
        <Grid container spacing={{ xs: 3, md: 4 }} className={styles.quickLinks}>
          {quickLinks.map((link) => (
            <Grid item xs={12} md={4} key={link.path}>
              <Paper 
                className={styles.card}
                onClick={() => navigate(link.path)}
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

        {/* Standings Section */}
        <Grid container spacing={{ xs: 3, md: 4 }} className={styles.standings}>
          <Grid item xs={12} md={6}>
            <Paper className={styles.standingsCard}>
              <Typography variant="h5" className={styles.standingsTitle}>
                Top 3 Drivers
              </Typography>
              {!isDriverLoading && driverStandings && (
                <div className={styles.standingsList}>
                  {driverStandings.slice(0, 3).map((driver: DriverStanding, index: number) => (
                    <div key={driver.position} className={styles.standingsItem}>
                      <Typography variant="h6" className={styles.position}>
                        {index + 1}
                      </Typography>
                      <Typography variant="body1" className={styles.name}>
                        {driver.Driver.givenName} {driver.Driver.familyName}
                      </Typography>
                      <Typography variant="body1" className={styles.points}>
                        {driver.points} pts
                      </Typography>
                    </div>
                  ))}
                </div>
              )}
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper className={styles.standingsCard}>
              <Typography variant="h5" className={styles.standingsTitle}>
                Top 3 Constructors
              </Typography>
              {!isConstructorLoading && constructorStandings && (
                <div className={styles.standingsList}>
                  {constructorStandings.slice(0, 3).map((constructor: ConstructorStanding, index: number) => (
                    <div key={constructor.position} className={styles.standingsItem}>
                      <Typography variant="h6" className={styles.position}>
                        {index + 1}
                      </Typography>
                      <Typography variant="body1" className={styles.name}>
                        {constructor.Constructor.name}
                      </Typography>
                      <Typography variant="body1" className={styles.points}>
                        {constructor.points} pts
                      </Typography>
                    </div>
                  ))}
                </div>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default HomePage; 
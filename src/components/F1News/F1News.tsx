import React from 'react';
import { Paper, Typography, Box, Link, CircularProgress, Grid } from '@mui/material';
import { useF1News } from '../../hooks/useF1News';
import styles from './F1News.module.css';

const F1News: React.FC = () => {
  const { data: news, isLoading, error } = useF1News();

  if (isLoading) {
    return (
      <Box className={styles.loadingContainer}>
        <CircularProgress sx={{ color: '#b40600' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography className={styles.errorMessage}>
        Error loading news
      </Typography>
    );
  }

  return (
    <Grid container spacing={2} className={styles.newsContainer}>
      {news?.slice(0, 3).map((item, index) => (
        <Grid item xs={12} key={index}>
          <Link
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.newsLink}
          >
            <Paper className={styles.newsCard}>
              <Typography className={styles.newsTitle}>
                {item.title}
              </Typography>
              <Typography 
                variant="caption" 
                className={styles.newsDate}
              >
                {new Date(item.pubDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </Typography>
            </Paper>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default F1News; 
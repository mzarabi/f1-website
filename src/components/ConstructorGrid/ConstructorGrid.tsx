import React from 'react';
import { useConstructors } from '../../hooks/useConstructors';
import LazyImage from '../common/LazyImage';
import { Skeleton, Grid } from '@mui/material';
import styles from './ConstructorGrid.module.css';
import teamPhotos from '../../data/teamPhotos';
import teamLogos from '../../data/teamLogos';
import { teamColors } from '../../utils/teamColors';

const ConstructorGrid: React.FC = () => {
  const { data: constructors, isLoading, error } = useConstructors();

  const getTeamImage = (constructorId: string) => {
    return teamPhotos[constructorId] || '';
  };

  const getTeamLogo = (constructorId: string) => {
    const logoKey = constructorId.toLowerCase();
    return teamLogos[logoKey] || '';
  };

  const getTeamColor = (constructorName: string) => {
    return teamColors[constructorName] || '#333333';
  };

  if (isLoading) {
    return (
      <div className={styles.gridContainer}>
        <Grid container spacing={4}>
          {[...Array(10)].map((_, index) => (
            <Grid item xs={12} sm={12} md={6} key={index}>
              <div className={styles.constructorCard}>
                <Skeleton variant="rectangular" height={240} sx={{ borderRadius: '8px' }} />
                <div className={styles.constructorInfo}>
                  <Skeleton width="80%" height={36} />
                  <Skeleton width="60%" height={30} />
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }

  if (error) {
    return <div>Error loading constructors: {error.message}</div>;
  }

  if (!constructors) {
    return null;
  }

  return (
    <div className={styles.gridContainer}>
      <Grid container spacing={4}>
        {constructors.map((constructor) => (
          <Grid item xs={12} sm={12} md={6} key={constructor.constructorId}>
            <div className={styles.constructorCard} style={{ backgroundColor: getTeamColor(constructor.name)}}>
              <LazyImage
                src={getTeamImage(constructor.constructorId)}
                alt={constructor.name}
                className={styles.constructorImage}
              />
              <div className={styles.constructorInfo} style={{ backgroundColor: getTeamColor(constructor.name) }}>
                <div 
                  className={styles.constructorNameContainer}
                  
                >
                  <div className={styles.constructorName}>{constructor.name}</div>
                  <img 
                    src={getTeamLogo(constructor.constructorId)} 
                    alt={`${constructor.name} logo`} 
                    className={styles.constructorLogo} 
                  />
                </div>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ConstructorGrid; 
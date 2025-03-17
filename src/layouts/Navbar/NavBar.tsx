import React, { useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';

import styles from './NavBar.module.css';
import MobileDrawer from './MobileDrawer';
import DesktopNavItems from './DesktopNavItems';

interface NavItem {
  label: string;
  path: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Schedule', path: '/schedule' },
  { label: 'Drivers', path: '/drivers' },
  { label: 'Teams', path: '/teams' },
  { label: 'Standings', path: '/standings' },
];

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const handleDrawerToggle = (isOpen: boolean) => () => {
    setIsDrawerOpen(isOpen);
  };

  const navigateTo = (path: string) => {
    navigate(path);
    setIsDrawerOpen(false);
  };

  return (
    <AppBar position="sticky" className={styles.appBar}>
      <Container maxWidth="xl" className={styles.container}>
        <Toolbar disableGutters>
          <Box className={styles.desktopLogo} onClick={() => navigateTo('/')}>
            <img src={logo} alt="F1 logo" className={styles.logoImage} />
          </Box>

          <Box className={styles.mobileMenuContainer}>
            <IconButton
              size="large"
              aria-label="menu"
              onClick={handleDrawerToggle(true)}
              color="inherit"
            >
              <MenuIcon fontSize="large" />
            </IconButton>

            <MobileDrawer
              isOpen={isDrawerOpen}
              onClose={handleDrawerToggle(false)}
              items={NAV_ITEMS}
              onNavigate={navigateTo}
              activeItem={location.pathname}
            />
          </Box>

          <Box className={styles.mobileLogo} onClick={() => navigateTo('/')}>
            <img src={logo} alt="F1 logo" className={styles.mobileLogoImage} />
          </Box>

          <Box className={styles.desktopNavContainer}>
            <DesktopNavItems 
              items={NAV_ITEMS} 
              onNavigate={navigateTo} 
              activeItem={location.pathname}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;

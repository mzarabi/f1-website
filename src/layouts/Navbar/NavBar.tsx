import React, { useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';

import styles from './NavBar.module.css';
import MobileDrawer from './MobileDrawer';
import DesktopNavItems from './DesktopNavItems';
import StandingsMenu from './StandingsMenu';

interface NavItem {
  label: string;
  path: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Drivers', path: '/drivers' },
  { label: 'Constructors', path: '/constructors' },
];

const STANDINGS_ITEMS: NavItem[] = [
  { label: 'Driver Standings', path: '/drivers-standings' },
  { label: 'Constructor Standings', path: '/constructor-standings' },
];

const ALL_NAV_ITEMS = [...NAV_ITEMS, ...STANDINGS_ITEMS];

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [standingsMenuAnchor, setStandingsMenuAnchor] = useState<HTMLElement | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const handleStandingsMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setStandingsMenuAnchor(event.currentTarget);
  };

  const handleStandingsMenuClose = () => {
    setStandingsMenuAnchor(null);
  };

  const handleDrawerToggle = (isOpen: boolean) => () => {
    setIsDrawerOpen(isOpen);
  };

  const navigateTo = (path: string) => {
    navigate(path);
    handleStandingsMenuClose();
    setIsDrawerOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
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
              items={ALL_NAV_ITEMS}
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

            <StandingsMenu
              items={STANDINGS_ITEMS}
              anchorEl={standingsMenuAnchor}
              onOpen={handleStandingsMenuOpen}
              onClose={handleStandingsMenuClose}
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

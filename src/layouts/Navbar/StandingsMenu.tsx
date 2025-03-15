import React from 'react';
import { IconButton, Typography, Menu, MenuItem, Box } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import styles from './NavItems.module.css';

interface NavItem {
  label: string;
  path: string;
}

interface StandingsMenuProps {
  items: NavItem[];
  anchorEl: HTMLElement | null;
  onOpen: (event: React.MouseEvent<HTMLElement>) => void;
  onClose: () => void;
  onNavigate: (path: string) => void;
  activeItem: string;
}

const StandingsMenu: React.FC<StandingsMenuProps> = ({
  items,
  anchorEl,
  onOpen,
  onClose,
  onNavigate,
  activeItem,
}) => {
  const isMenuOpen = Boolean(anchorEl);
  const isActive = items.some(item => item.path === activeItem);

  return (
    <>
      <IconButton
        onClick={onOpen}
        disableRipple={true}
        className={isActive ? styles.activeNavButton : ''}
      >
        <Typography variant="h6" className={styles.navButton}>
          Standings
          <KeyboardArrowDownIcon 
            className={`${styles.arrowIcon} ${isMenuOpen ? styles.arrowIconOpen : ''}`} 
          />
        </Typography>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={onClose}
        MenuListProps={{
          'aria-labelledby': 'standings-button',
        }}
        className={styles.menu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {items.map((item) => (
          <MenuItem
            key={item.path}
            onClick={() => onNavigate(item.path)}
            className={`${styles.menuItem} ${activeItem === item.path ? styles.activeMenuItem : ''}`}
          >
            <Box className={styles.menuItemContent}>
              <EmojiEventsIcon className={styles.menuIcon} />
              <Typography>{item.label}</Typography>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default StandingsMenu;

import React from 'react';
import {
  IconButton,
  Typography,
} from '@mui/material';
import styles from './NavItems.module.css';

interface NavItem {
  label: string;
  path: string;
}

interface DesktopNavItemsProps {
  items: NavItem[];
  onNavigate: (path: string) => void;
  activeItem: string;
}

const DesktopNavItems: React.FC<DesktopNavItemsProps> = ({ 
  items, 
  onNavigate,
  activeItem 
}) => {
  return (
    <>
      {items.map((item) => (
        <IconButton
          key={item.path}
          onClick={() => onNavigate(item.path)}
          disableRipple={true}
          className={activeItem === item.path ? styles.activeNavButton : ''}
        >
          <Typography
            variant="h6"
            className={styles.navButton}
          >
            {item.label}
          </Typography>
        </IconButton>
      ))}
    </>
  );
};

export default DesktopNavItems;

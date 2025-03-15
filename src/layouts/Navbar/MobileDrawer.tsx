import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styles from './NavItems.module.css';

interface NavItem {
  label: string;
  path: string;
}

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: NavItem[];
  onNavigate: (path: string) => void;
  activeItem: string;
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onNavigate,
  activeItem,
}) => {
  const handleNavigation = (path: string) => {
    onNavigate(path);
    onClose();
  };

  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={onClose}
      className={styles.drawer}
    >
      <div className={styles.drawerHeader}>
        <IconButton onClick={onClose} className={styles.closeButton}>
          <CloseIcon />
        </IconButton>
      </div>
      <List className={styles.drawerList}>
        {items.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              onClick={() => handleNavigation(item.path)}
              className={activeItem === item.path ? styles.activeDrawerItem : ''}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default MobileDrawer;

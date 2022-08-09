import type { ReactNode } from 'react';

import HomeIcon from '@mui/icons-material/Home';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Link from 'next/link';

const SIDEBAR_WIDTH = 240;

const navItems = [
  {
    text: 'Home',
    href: '/',
    icon: <HomeIcon />,
  },
  {
    text: 'Search',
    href: '/',
    icon: <SearchIcon />,
  },
  {
    text: 'Notifications',
    href: '/',
    icon: <NotificationsIcon />,
  },
  {
    text: 'Messages',
    href: '/',
    icon: <MailIcon />,
  },
];

const BottomNav = () => (
  <Paper
    sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }}
    elevation={3}
  >
    <BottomNavigation>
      {navItems.map(({ text, href, icon }) => (
        <Link href={href} key={text}>
          <Tooltip title={text} placement="top" arrow>
            <BottomNavigationAction label={text} icon={icon} />
          </Tooltip>
        </Link>
      ))}
    </BottomNavigation>
  </Paper>
);

const SideNavContainer = ({ children }: { children: ReactNode }) => {
  const theme = useTheme();
  return (
    <List
      component="ul"
      sx={{
        borderRight: `1px solid ${theme.palette.divider}`,
        minHeight: '100vh',
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
      }}
    >
      {children}
    </List>
  );
};

const SideNavMd = () => (
  <SideNavContainer>
    {navItems.map(({ text, href, icon }) => (
      <ListItem key={text} disablePadding>
        <Link href={href}>
          <ListItemButton
            sx={{
              borderRadius: 8,
              display: 'inline-flex',
              minWidth: SIDEBAR_WIDTH,
            }}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </Link>
      </ListItem>
    ))}
  </SideNavContainer>
);

const SideNavSm = () => (
  <SideNavContainer>
    {navItems.map(({ text, href, icon }) => (
      <ListItem key={text} disablePadding>
        <Link href={href}>
          <ListItemButton
            sx={{
              '&:hover': { backgroundColor: 'inherit' },
            }}
          >
            <ListItemIcon sx={{ minWidth: '40px' }}>
              <Tooltip title={text} placement="right" arrow>
                <IconButton>{icon}</IconButton>
              </Tooltip>
            </ListItemIcon>
          </ListItemButton>
        </Link>
      </ListItem>
    ))}
  </SideNavContainer>
);

export const Nav = () => {
  const theme = useTheme();
  const xsmall = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
  const medium = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  if (xsmall) {
    return <BottomNav />;
  }
  if (medium) {
    return <SideNavSm />;
  }
  return <SideNavMd />;
};

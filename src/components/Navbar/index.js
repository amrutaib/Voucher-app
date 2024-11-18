import { React, useState } from "react";
import {
  Box,
  List,
  styled,
  Divider,
  Toolbar,
  ListItem,
  IconButton,
  Typography,
  CssBaseline,
  createTheme,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import Data from "./NavigationRoutes";
import NavBarHeader from "./NavBarHeader";
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Menu } from '@mui/icons-material';

const drawerWidth = 240

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);

export default function Navbar({ HeaderTitle }) {

  const navigate = useNavigate()
  const location = useLocation()

  const theme = createTheme({
    typography: {
      fontFamily: 'Mulish, sans-serif',
    },
  });

  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const PageTitle = location.pathname.split('/')[1] || 'Dashboard'

  const isPageActive = (item) => {
    return location.pathname === item.route || (item.subRoutes && item.subRoutes.some(subRoute => location.pathname.startsWith(subRoute)))
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* App Bar Header */}
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ bgcolor: "#303f9f", background: 'linear-gradient(45deg, #303f9f, #7b1fa2)' }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            sx={[{ marginRight: 5 }, open && { display: 'none' }]}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ fontFamily: 'Mulish, sans-serif', fontSize: '20px' }}>
            {HeaderTitle || PageTitle}
          </Typography>
        </Toolbar>
        <NavBarHeader />
      </AppBar>

      {/* Drawer Config */}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Typography variant="h5" color={'ThreeDHighlight'}>Voucher</Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List>
          {
            Data.map((item) => (
              <ListItem
                key={item.key}
                disablePadding
                sx={{
                  display: 'block',
                  borderTopRightRadius: '10px',
                  borderBottomRightRadius: '10px',
                  boxShadow: isPageActive(item) && '3px 3px 20px 0 rgba(123, 31, 162, .5)',
                  background: isPageActive(item) && 'linear-gradient(45deg, #303f9f, #7b1fa2)',
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48, px: 2.5,
                    justifyContent: open ? 'initial' : 'center'
                  }}
                  selected={isPageActive(item)}
                  onClick={() => navigate(item.route)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto', justifyContent: 'center',
                      color: isPageActive(item) ? '#fff' : '#000',
                    }}
                  >
                    {item.iconName}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.routeName}
                    sx={{
                      opacity: open ? 1 : 0,
                      color: isPageActive(item) ? '#fff' : '#000',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))
          }
        </List>
      </Drawer>
    </Box >
  );
}

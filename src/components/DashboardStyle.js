import { makeStyles } from "@mui/styles";

const drawerWidth = 240;
const dashboardStyle = makeStyles((theme) => ({
  menuButton: {
    root: {
      display: "flex"
    },
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },

  AppBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },

  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    },
    "& ::-webkit-scrollbar": {
      display: "none"
    }
  },
  TemporaryDrawer: {
    "& ::-webkit-scrollbar": {
      display: "none"
    }
  },

  drawerPaper: {
    width: drawerWidth
  },

  toolbar: theme.mixins.toolbar
}));

export default dashboardStyle;

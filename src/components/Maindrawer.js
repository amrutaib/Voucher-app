import { Box, Divider, Drawer, Hidden, Typography } from "@material-ui/core";
import dashboardStyle from "./DashboardStyle";
import DrawerList from "./DrawerList";

export default function  Maindrawer ({ mobileOpen, setMobileOpen })  {
  const classes = dashboardStyle();
  return (

    <nav className={classes.drawer}>
      <Hidden smUp>
        <Drawer
          className={classes.TemporaryDrawer}
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={() => setMobileOpen(!mobileOpen)}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <Box p={2} component="span">
            <Typography variant="h5">Dashboard</Typography>
          </Box>
          <Divider />
          <DrawerList />
        </Drawer>
      </Hidden>

      <Hidden xsDown>
        <Drawer
          variant="permanent"
          anchor="left"
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <DrawerList />
        </Drawer>
      </Hidden>
      
    </nav>
  );
};


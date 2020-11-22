import React, { FC, useState } from 'react';
import {
  AppBar,
  Button,
  Drawer,
  DrawerProps,
  makeStyles,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { RoomList } from '..';
import DialogLogout from '../DialogLogout/DialogLogout';

const drawerWidth = 400;

const useStyles = makeStyles(() => ({
  appBar: {
    maxWidth: 400,
    boxShadow: 'none',
    top: 'auto',
    bottom: 0,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
}));

const CustomDrawer: FC<DrawerProps> = (props) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Drawer
      {...props}
      variant={matches ? 'permanent' : undefined}
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <RoomList />
        <AppBar
          component="div"
          position="absolute"
          color="inherit"
          className={classes.appBar}
        >
          <Toolbar>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={handleClickOpen}
            >
              Выйти
            </Button>
          </Toolbar>
        </AppBar>
      </div>
      <DialogLogout open={open} onClose={handleClose} />
    </Drawer>
  );
};

export default CustomDrawer;

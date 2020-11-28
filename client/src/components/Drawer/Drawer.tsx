import React, { FC, useState } from 'react';
import {
  AppBar,
  Button,
  Drawer,
  DrawerProps,
  Toolbar,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import useStyles from './styles';
import { DialogCreateRoom, RoomList } from '..';

const CustomDrawer: FC<DrawerProps> = (props) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
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
              color="primary"
              fullWidth
              onClick={handleOpen}
            >
              Создать комнату
            </Button>
          </Toolbar>
        </AppBar>
      </div>
      <DialogCreateRoom open={open} onClose={handleClose} />
    </Drawer>
  );
};

export default CustomDrawer;

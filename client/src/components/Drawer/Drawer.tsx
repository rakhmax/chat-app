import React, { ChangeEvent, FC, useState } from 'react';
import {
  AppBar,
  Button,
  Drawer,
  DrawerProps,
  Toolbar,
  Tabs,
  Tab,
  Box,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { DialogCreateRoom, RoomList } from '..';
import useStyles from './styles';
import UserList from '../UserList/UserList';

interface TabPanelProps {
  children: React.ReactNode;
  index: any;
  value: any;
}

const TabPanel = (props: TabPanelProps) => {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
};

const CustomDrawer: FC<DrawerProps> = (props) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const classes = useStyles();
  const [createOpen, setCreateOpen] = useState(false);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: ChangeEvent<unknown>, newValue: number) => {
    setValue(newValue);
  };

  const handleOpen = () => {
    setCreateOpen(true);
  };

  const handleClose = () => {
    setCreateOpen(false);
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
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          variant="fullWidth"
        >
          <Tab label="Комнаты" />
          <Tab label="Пользователи" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <RoomList />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <UserList />
        </TabPanel>
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
      <DialogCreateRoom open={createOpen} handleClose={handleClose} />
    </Drawer>
  );
};

export default CustomDrawer;

import React, { FC, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import socket from '../socket';

import {
  AppBar,
  MessageList,
  Drawer,
} from '../components';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
}));

const MessagesPage: FC = () => {
  const [, setConnections] = useState([]);
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    socket.on('connections', (data: any) => {
      setConnections(data);
    });
  }, []);

  return (
    <div className={classes.root}>
      <AppBar drawerHandler={() => setOpen(!open)} />
      <Drawer open={open} onClose={() => setOpen(false)} />
      <MessageList />
    </div>
  );
};

export default MessagesPage;

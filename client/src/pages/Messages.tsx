import React, { FC, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

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
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <div className={classes.root}>
      <AppBar drawerHandler={() => setOpen(!open)} />
      <Drawer open={open} onClose={() => setOpen(false)} />
      <MessageList />
    </div>
  );
};

export default MessagesPage;

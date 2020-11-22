import React, { FC } from 'react';
import {
  AppBar,
  makeStyles,
  Toolbar,
} from '@material-ui/core';
import { Message, MessageBox } from '..';

const useStyles = makeStyles((theme) => ({
  appBar: {
    boxShadow: 'none',
    borderTop: '1px solid rgba(0, 0, 0, 0.12)',
    top: 'auto',
    bottom: 0,
    width: theme.breakpoints.up('md') ? 'calc(100% - 401px)' : '100%',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  textArea: {
    outline: 0,
    border: 0,
    padding: theme.spacing(1.5),
  },
}));

const messages = [
  { user: 'User1', text: '1' },
  { user: 'User2', text: '2', isMine: true },
  { user: 'User1', text: '3' },
  { user: 'User1', text: '4' },
  { user: 'User1', text: '5' },
  { user: 'User1', text: '6', isMine: true },
  { user: 'User1', text: '7', isMine: true },
  { user: 'User1', text: '8' },
  { user: 'User1', text: '9' },
];

const MessageList: FC = () => {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <Toolbar />
      {messages.map((msg) => (
        <Message
          text={msg.text}
          isMine={msg.isMine}
          username={msg.user}
        />
      ))}
      <Toolbar />
      <AppBar
        component="div"
        position="fixed"
        color="inherit"
        className={classes.appBar}
      >
        <MessageBox />
      </AppBar>
    </main>
  );
};

export default MessageList;

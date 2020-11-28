import React, {
  FC,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Message, MessageBox } from '..';
import MessageType from '../Message/propTypes';

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
    height: 'calc(100vh - 64px)',
    padding: theme.spacing(3),
  },
  textArea: {
    outline: 0,
    border: 0,
    padding: theme.spacing(1.5),
  },
}));

const initialState: MessageType[] = [];

const MessageList: FC = () => {
  const classes = useStyles();
  const [messages, setMessages] = useState<MessageType[]>(initialState);
  const messageListRef = useRef<HTMLElement>(null);

  const scrollToBottom = () => {
    if (messageListRef.current !== null) {
      window.scrollTo(0, messageListRef.current.scrollHeight);
    }
  };

  const sendMessage = (msg: MessageType) => {
    setMessages((prev) => {
      if (prev.length > 20) {
        prev.shift();
      }

      return [
        ...prev,
        msg,
      ];
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <main className={classes.content} ref={messageListRef}>
      <Toolbar />
      {messages.length
        ? messages.map((msg) => (
          <Message
            image={msg.image}
            text={msg.text}
            isMine={msg.isMine}
            username={msg.username}
          />
        )) : (
          <Typography>Сообщений еще нет</Typography>
        )}
      <Toolbar />
      <MessageBox sendMessage={sendMessage} />
    </main>
  );
};

export default MessageList;

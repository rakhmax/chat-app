import React, {
  FC,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Toolbar, Typography } from '@material-ui/core';

import { Message, MessageBox } from '..';

import IMessage from '../../types/IMessage';
import socket from '../../socket';
import useStyles from './styles';
import AppContext from '../../context';

const initialState: IMessage[] = [];

const MessageList: FC = () => {
  const classes = useStyles();
  const [messages, setMessages] = useState<IMessage[]>(initialState);
  const messageListRef = useRef<HTMLElement>(null);
  const { user, currentRoom } = useContext(AppContext);

  const scrollToBottom = () => {
    if (messageListRef.current !== null) {
      window.scrollTo(0, messageListRef.current.scrollHeight);
    }
  };

  const sendMessage = (msg: IMessage) => {
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
    socket.on('messages', (data: any) => {
      setMessages(data);
    });
    socket.on('message', (data: any) => {
      setMessages((prev) => [
        ...prev,
        data,
      ]);
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const renderNoRoom = () => <Typography>Выберите комнату</Typography>;

  const renderMessages = () => (
    <>
      {messages.length
        ? messages.map((msg) => (
          <Message
            image={msg.image}
            text={msg.text}
            sender={msg.sender}
          />
        )) : (
          <Typography>Сообщений еще нет</Typography>
        )}
      <Toolbar className={classes.toolbar} />
      <MessageBox sendMessage={sendMessage} user={user} />
    </>
  );

  return (
    <main className={classes.content} ref={messageListRef}>
      <Toolbar />
      {!currentRoom.id ? renderNoRoom() : renderMessages()}
    </main>
  );
};

export default MessageList;

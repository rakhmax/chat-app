import React, {
  ChangeEvent,
  FC,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  AppBar,
  IconButton,
  TextareaAutosize,
} from '@material-ui/core';
import {
  Send as IconSend,
  AttachFile as IconAttachFile,
} from '@material-ui/icons';

import useStyles from './styles';
import PropTypes from './propTypes';
import socket from '../../socket';
import getCurrentRoom from '../../helpers/getCurrentRoom';
import AppContext from '../../context';
import IMessage from '../../types/IMessage';

const MessageBox: FC<PropTypes> = ({ sendMessage }) => {
  const { user, currentRoom } = useContext(AppContext);
  const initialState = {
    text: '',
    sender: user.name,
    room: currentRoom.name,
  };
  const classes = useStyles();
  const [message, setMessage] = useState<IMessage>(initialState);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (message.text || message.image) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [message]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;

    setMessage((prev) => ({
      ...prev,
      text,
    }));
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const reader = new FileReader();

    if (files) {
      reader.readAsDataURL(files[0]);

      reader.addEventListener('load', () => {
        setMessage((prev) => ({
          ...prev,
          image: reader.result || undefined,
        }));
      });
    }

    e.target.value = '';
  };

  const handleSendMessage = (e: any) => {
    if (e.type === 'click' || e.code === 'Enter') {
      e.preventDefault();

      if (message.text || message.image) {
        const msg = {
          ...message,
          text: message.text.trim(),
          room: getCurrentRoom()?.name,
        };
        socket.emit('message', msg);
        sendMessage(msg);
        setMessage(initialState);
      }
    }
  };

  return (
    <AppBar
      component="div"
      position="fixed"
      color="inherit"
      className={classes.appBar}
    >
      <IconButton
        aria-label="attach"
        component="label"
        className={classes.buttonAttach}
      >
        <IconAttachFile />
        <input
          hidden
          type="file"
          onChange={handleFileUpload}
        />
      </IconButton>
      <TextareaAutosize
        rowsMax={4}
        rowsMin={4}
        placeholder="Сообщение"
        className={classes.textArea}
        value={message.text}
        onChange={handleChange}
        onKeyDown={handleSendMessage}
      />
      <IconButton
        aria-label="delete"
        disabled={disabled}
        className={classes.buttonSend}
        onClick={handleSendMessage}
      >
        <IconSend />
      </IconButton>
    </AppBar>
  );
};

export default MessageBox;

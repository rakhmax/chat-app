import React, { FC, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogProps,
} from '@material-ui/core';

import { ButtonLoading } from '..';
import socket from '../../socket';
import AppContext from '../../context';

const DialogLogout: FC<DialogProps> = (props) => {
  const history = useHistory();
  const { user } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      sessionStorage.clear();
      user.set(null);
      socket.emit('leave', 'sdsd');
      history.replace('/');
    }, 1000);
  };

  return (
    <Dialog
      {...props}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Вы уверены?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Ваши сообщения будут стерты, а имя освобождено
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="default">
          Отменить
        </Button>
        <ButtonLoading
          autoFocus
          color="secondary"
          loading={loading}
          disabled={loading}
          onClick={handleLogout}
          circularProgress={{ size: 24, color: 'secondary' }}
        >
          Ок
        </ButtonLoading>
      </DialogActions>
    </Dialog>
  );
};

export default DialogLogout;

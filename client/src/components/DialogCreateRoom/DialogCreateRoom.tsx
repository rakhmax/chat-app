import React, {
  ChangeEvent,
  FC,
  SyntheticEvent,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';

import socket from '../../socket';
import PropTypes from './propTypes';
import AppContext from '../../context';

const DialogCreateRoom: FC<PropTypes> = ({ handleClose, ...props }) => {
  const { user } = useContext(AppContext);
  const [roomname, setRoomname] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRoomname(e.target.value);
  };

  useEffect(() => {
    socket.on('create', (data: any) => {
      if (data.msg.type === 'error') {
        setError(data.msg.text);
      } else {
        setError('');
        handleClose();
      }
      setLoading(false);
      setRoomname('');
    });
  }, [handleClose]);

  const createRoom = (e: SyntheticEvent) => {
    e.preventDefault();

    if (roomname) {
      setLoading(true);

      socket.emit('create', {
        name: roomname,
        owner: user?.name,
      });
    } else {
      setError('Введите название');
    }
  };

  return (
    <Dialog
      {...props}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      onClose={handleClose}
    >
      <DialogTitle id="alert-dialog-title">
        Новая комната
      </DialogTitle>
      <DialogContent>
        <form
          noValidate
          autoComplete="off"
          onSubmit={createRoom}
        >
          <TextField
            variant="outlined"
            label="Название комнаты"
            value={roomname}
            error={!!error}
            disabled={loading}
            helperText={error}
            onChange={handleChange}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button color="default" onClick={handleClose}>
          Отменить
        </Button>
        <Button
          autoFocus
          color="secondary"
          disabled={!roomname}
          onClick={createRoom}
        >
          Ок
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogCreateRoom;

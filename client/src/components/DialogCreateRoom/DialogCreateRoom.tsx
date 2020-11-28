import React, {
  ChangeEvent,
  FC,
  useState,
} from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogProps,
  TextField,
} from '@material-ui/core';

const DialogCreateRoom: FC<DialogProps> = (props) => {
  const [roomname, setRoomname] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRoomname(e.target.value);
  };

  return (
    <Dialog
      {...props}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Новая комната</DialogTitle>
      <DialogContent>
        <TextField
          variant="outlined"
          label="Название комнаты"
          value={roomname}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button color="default">
          Отменить
        </Button>
        <Button color="secondary" autoFocus>
          Ок
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogCreateRoom;

import React, { FC } from 'react';
import Button from '@material-ui/core/Button';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const DialogLogout: FC<DialogProps> = (props) => (
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
      <Button color="secondary" autoFocus>
        Ок
      </Button>
    </DialogActions>
  </Dialog>
);

export default DialogLogout;

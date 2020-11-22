import React, { FC } from 'react';
import { makeStyles, TextareaAutosize } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  textArea: {
    outline: 0,
    border: 0,
    padding: theme.spacing(1.5),
  },
}));

const Message: FC = () => {
  const classes = useStyles();

  return (
    <TextareaAutosize
      rowsMax={4}
      rowsMin={4}
      placeholder="Сообщение"
      className={classes.textArea}
    />
  );
};

export default Message;

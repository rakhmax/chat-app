import React, { FC } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import PropTypes from './IMessage';

const useStyles = makeStyles((theme) => ({
  message: {
    minWidth: 150,
    maxWidth: '70%',
    padding: theme.spacing(1.5),
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
  },
  mine: {
    alignSelf: 'flex-end',
    backgroundColor: '#bbdefb',
  },
}));

const Message: FC<PropTypes> = ({ text, isMine, username }) => {
  const classes = useStyles();

  return (
    <Typography
      component="div"
      paragraph
      className={classes.message}
      classes={{
        paragraph: isMine ? classes.mine : undefined,
      }}
    >
      <Typography
        component="span"
        variant="body2"
        color="textPrimary"
      >
        {username}
      </Typography>
      <Typography
        color="textPrimary"
      >
        {text}
      </Typography>
    </Typography>
  );
};

export default Message;

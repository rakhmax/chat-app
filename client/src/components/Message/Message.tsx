import React, { FC, useContext } from 'react';
import { Typography } from '@material-ui/core';

import PropTypes from './propTypes';
import useStyles from './styles';
import AppContext from '../../context';

const Message: FC<PropTypes> = ({ text, image, sender }) => {
  const { user } = useContext(AppContext);
  const classes = useStyles();

  return (
    <Typography
      paragraph
      component="div"
      className={classes.message}
      classes={{
        paragraph: sender === user.name ? classes.mine : undefined,
      }}
    >
      <Typography
        component="span"
        variant="body2"
        color="textPrimary"
      >
        {sender}
      </Typography>
      <Typography color="textPrimary">
        {text}
      </Typography>
      {image && (
        <img
          src={image.toString()}
          alt="kek"
          className={classes.image}
        />
      )}
    </Typography>
  );
};

export default Message;

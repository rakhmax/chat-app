import React, { FC } from 'react';
import { Typography } from '@material-ui/core';

import PropTypes from './propTypes';
import useStyles from './styles';

const Message: FC<PropTypes> = ({
  text, image, isMine, username,
}) => {
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

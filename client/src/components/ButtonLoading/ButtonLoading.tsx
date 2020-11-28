import React, { FC } from 'react';
import { Button, CircularProgress } from '@material-ui/core';

import Props from './propTypes';
import useStyles from './styles';

const ButtonLoading: FC<Props> = ({
  loading, circularProgress, children, ...props
}) => {
  const classes = useStyles();

  return (
    <Button
      {...props}
      style={{ position: 'relative' }}
    >
      {children}
      {loading && <CircularProgress {...circularProgress} className={classes.buttonLoading} />}
    </Button>
  );
};

export default ButtonLoading;

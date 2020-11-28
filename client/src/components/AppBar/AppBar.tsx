import React, { FC, useState } from 'react';
import {
  AppBar,
  IconButton,
  Typography,
  Toolbar,
  Button,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Menu as MenuIcon } from '@material-ui/icons';

import useStyles from './styles';
import PropTypes from './propTypes';
import { DialogLogout } from '..';

const CustomAppBar: FC<PropTypes> = ({ drawerHandler }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        {!matches && (
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          className={classes.menuButton}
          onClick={drawerHandler}
        >
          <MenuIcon />
        </IconButton>
        )}
        <Typography noWrap variant="h6" className={classes.title}>
          Realtime Chat App
        </Typography>
        <Button color="inherit" onClick={handleOpen}>Выйти</Button>
      </Toolbar>
      <DialogLogout open={open} onClose={handleClose} />
    </AppBar>
  );
};

export default CustomAppBar;

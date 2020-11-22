import React, { FC } from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {
  AppBar,
  Typography,
  Toolbar,
  makeStyles,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import PropTypes from './IAppBar';

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const CustomAppBar: FC<PropTypes> = ({ drawerHandler }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const classes = useStyles();

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
        <Typography variant="h6" noWrap>
          Realtime Chat App
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;

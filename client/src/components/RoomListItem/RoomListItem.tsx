import React, { FC, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Popover,
  Button,
  Typography,
} from '@material-ui/core';
import { Delete as DeleteIcon, ExitToApp as LoginIcon } from '@material-ui/icons';

import PropTypes from './IRoomListItem';
import socket from '../../socket';
import AppContext from '../../context';

const useStyles = makeStyles({
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
});

const RoomList: FC<PropTypes> = ({ data, current, ...props }) => {
  const { currentRoom, user } = useContext(AppContext);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleJoin = () => {
    socket.emit('leave', {
      room: currentRoom,
      user: user.name,
    });
    sessionStorage.setItem('currentRoom', JSON.stringify(data));
    currentRoom.set(data);
    socket.emit('join', {
      room: { ...data },
      user: user.name,
    });
    currentRoom.set(data);
  };

  const handleRemove = () => {
    socket.emit('remove', data);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Link
      {...props}
      className={classes.link}
      replace
      to={{
        pathname: '/messages',
        state: {
          room: { ...data },
        },
      }}
    >
      <ListItem alignItems="flex-start" button>
        <ListItemAvatar>
          <Avatar alt={data.name} src="first letter" />
        </ListItemAvatar>
        <ListItemText
          primary={data.name}
          secondary={(
            <>
              <Typography
                component="span"
                variant="body2"
                color="textPrimary"
              >
                Онлайн:
                {' '}
                {data.online}
              </Typography>
            </>
          )}
        />

        <ListItemSecondaryAction>
          {data.owner === user?.name && (
            <>
              <IconButton
                onClick={handleClick}
                aria-describedby={id}
                edge="end"
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <Button onClick={handleRemove}>Подтвердить</Button>
              </Popover>
            </>
          )}
          {!current && (
            <IconButton
              edge="end"
              aria-label="join"
              onClick={handleJoin}
            >
              <LoginIcon />
            </IconButton>
          )}
        </ListItemSecondaryAction>
      </ListItem>
    </Link>
  );
};

export default RoomList;

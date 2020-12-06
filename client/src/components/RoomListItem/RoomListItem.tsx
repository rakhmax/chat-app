import React, { FC, useContext, useState } from 'react';
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Popover,
  Button,
  Typography,
} from '@material-ui/core';
import { Delete as DeleteIcon, ExitToApp as LoginIcon } from '@material-ui/icons';

import PropTypes from './propTypes';
import socket from '../../socket';
import AppContext from '../../context';

const RoomListItem: FC<PropTypes> = ({ data, current }) => {
  const { currentRoom, user } = useContext(AppContext);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleJoin = () => {
    socket.emit('leave', {
      user,
      room: currentRoom,
    });

    sessionStorage.setItem('currentRoom', JSON.stringify(data));
    currentRoom.set(data);

    socket.emit('join', {
      user,
      room: data,
    });
  };

  const handleRemove = () => {
    socket.emit('remove', data);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
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
        {data.owner === user.name && (
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
  );
};

export default RoomListItem;

import React, { FC } from 'react';
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core';
import PropTypes from './IRoomListItem';

const RoomList: FC<PropTypes> = ({ data, lastMsg }) => (
  <ListItem alignItems="flex-start" button>
    <ListItemAvatar>
      <Avatar alt={data.name} src={data.avatar} />
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
            {lastMsg.user}
            :
            {' '}
          </Typography>
          {lastMsg.text}
        </>
      )}
    />
  </ListItem>
);

export default RoomList;

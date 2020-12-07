import React, { FC } from 'react';
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  ListItemIcon,
} from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';

import PropTypes from './propTypes';

const UserListItem: FC<PropTypes> = ({ data }) => (
  <ListItem alignItems="flex-start" button>
    <ListItemAvatar>
      <Avatar alt={data.name} src="first letter" />
    </ListItemAvatar>
    <ListItemText
      primary={data.name}
    />
    {data.online && (
    <ListItemSecondaryAction>
      <ListItemIcon>
        <StarIcon />
      </ListItemIcon>
    </ListItemSecondaryAction>
    )}
  </ListItem>
);

export default UserListItem;

import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core';

import PropTypes from './IRoomListItem';

const useStyles = makeStyles({
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
});

const RoomList: FC<PropTypes> = ({ data, lastMsg }) => {
  const classes = useStyles();

  return (
    <Link
      className={classes.link}
      replace
      to={{
        pathname: '/messages',
        state: { roomId: data.id },
      }}
    >
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
    </Link>
  );
};

export default RoomList;

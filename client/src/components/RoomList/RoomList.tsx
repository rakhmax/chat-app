import React, { FC } from 'react';
import { List } from '@material-ui/core';
import { RoomListItem } from '..';

const roomList = [
  {
    data: {
      id: '1',
      name: 'Room 1',
      avatar: 'r1',
    },
    lastMsg: {
      user: 'Maxim',
      text: 'Hello world',
    },
  },
  {
    data: {
      id: '1',

      name: 'Room 1',
      avatar: 'r1',
    },
    lastMsg: {

      user: 'Maxim',
      text: 'Hello world',
    },
  },
  {
    data: {
      id: '1',

      name: 'Room 1',
      avatar: 'r1',
    },
    lastMsg: {
      user: 'Maxim',
      text: 'Hello world',
    },
  },
  {
    data: {
      id: '1',
      name: 'Room 1',
      avatar: 'r1',
    },
    lastMsg: {
      user: 'Maxim',
      text: 'Hello world',
    },
  }, {
    data: {
      id: '1',

      name: 'Room 1',
      avatar: 'r1',
    },
    lastMsg: {
      user: 'Maxim',
      text: 'Hello world',
    },
  },
];

const RoomList: FC = () => (
  <List>
    {roomList.map((room) => (
      <RoomListItem
        key={room.data?.id}
        data={room.data}
        lastMsg={room.lastMsg}
      />
    ))}
  </List>
);

export default RoomList;

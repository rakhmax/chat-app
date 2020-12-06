import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { List, Snackbar } from '@material-ui/core';

import { RoomListItem } from '..';
import socket from '../../socket';
import IRoom, { IRoomWithStatus } from '../../types/IRoom';
import AppContext, { initialCurrentRoom } from '../../context';
import IOnline from '../../types/IOnline';

const RoomList: FC = () => {
  const { user, currentRoom } = useContext(AppContext);
  const [roomList, setRoomList] = useState<IRoom[]>([]);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [showSnackbar, setSnackbar] = useState(false);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') return;

    setSnackbar(false);
  };

  const handleOpen = (text: string) => {
    setSnackbarMessage(text);
    setSnackbar(true);
  };

  const changeOnlineCount = (data: IOnline) => {
    setRoomList((prev) => {
      const rooms = [...prev];
      const roomToUpdate = rooms.find((room) => data.name === room.name);

      if (roomToUpdate) {
        const updatedRoom: IRoom = {
          ...roomToUpdate,
          online: data.online,
        };

        rooms.splice(prev.findIndex((room) => data.name === room.name), 1, updatedRoom);
      }

      return rooms;
    });
  };

  const handleLeave = useCallback(() => {
    currentRoom.set(initialCurrentRoom);
  }, [currentRoom]);

  const joinOnLoad = useCallback(() => {
    if (currentRoom.name) {
      socket.emit('join', { user, room: currentRoom });
    }
  }, [user, currentRoom]);

  useEffect(() => {
    setRoomList((prev) => {
      const sortedRooms = [...prev];
      sortedRooms.sort((a, b) => b.online - a.online);

      return sortedRooms;
    });
  }, [roomList]);

  useEffect(() => {
    socket.emit('rooms');
    socket.on('rooms', (data: IRoomWithStatus | IRoomWithStatus[]) => {
      if (Array.isArray(data)) {
        setRoomList(data);
      } else if (data?.msg?.status === 'deleted') {
        setRoomList((prev) => [...prev].filter((room) => data.name !== room.name));
      } else {
        setRoomList((prev) => [...prev, data]);
      }
    });

    joinOnLoad();
    socket.on('join', () => {
      handleOpen('Владелец комнаты вошел в чат');
    });
    socket.on('leave', (data: IRoomWithStatus) => {
      if (data.msg) {
        sessionStorage.removeItem('currentRoom');
        handleLeave();
        handleOpen('Владелец комнаты удалил ее');
      }
    });
    socket.on('change-online', (data: IOnline) => {
      changeOnlineCount(data);
    });
  }, [handleLeave, joinOnLoad]);

  return (
    <List>
      {roomList.map((room) => (
        <RoomListItem
          key={room.name}
          data={room}
          current={room.name === currentRoom.name}
        />
      ))}
      <Snackbar
        style={{ marginTop: 60 }}
        open={showSnackbar}
        autoHideDuration={4000}
        onClose={handleClose}
        message={snackbarMessage}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      />
    </List>
  );
};

export default RoomList;

import React, {
  FC, useCallback, useContext, useEffect, useState,
} from 'react';
import { List, Snackbar } from '@material-ui/core';
import { RoomListItem } from '..';
import socket from '../../socket';
import IRoom from '../../types/IRoom';
import AppContext from '../../context';

const RoomList: FC = () => {
  const [roomList, setRoomList] = useState<IRoom[]>([]);
  const { currentRoom } = useContext(AppContext);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [showSnackbar, setSnackbar] = useState(false);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbar(false);
  };

  const handleOpen = (text: string) => {
    setSnackbarMessage(text);
    setSnackbar(true);
  };

  const changeOnlineCount = (roomData: IRoom) => {
    setRoomList((prev) => {
      const rooms = [...prev];
      const r = rooms.find((room) => roomData.name === room.name);
      const updatedRoom: any = {
        ...r,
        online: roomData.online,
      };

      rooms.splice(prev.findIndex((room) => roomData.name === room.name), 1, updatedRoom);
      return rooms;
    });
  };

  const handleLeave = useCallback(() => {
    currentRoom.set(null);
  }, [currentRoom]);

  useEffect(() => {
    socket.emit('rooms');
    socket.on('rooms', (data: any) => {
      if (Array.isArray(data)) {
        setRoomList(data);
      } else if (data?.msg?.status === 'deleted') {
        setRoomList((prev) => [...prev].filter((room) => data.id !== room.id));
      } else {
        setRoomList((prev) => [...prev, data]);
      }
    });
    socket.on('join', (data: any) => {
      handleOpen('Владелец комнаты вошел в чат');
    });
    socket.on('leave', (data: any) => {
      if (data.msg) {
        sessionStorage.removeItem('currentRoom');
        handleLeave();
        handleOpen('Владелец комнаты удалил ее');
      }
    });
    socket.on('change-online', (data: any) => {
      changeOnlineCount(data);
    });
  }, [handleLeave]);

  return (
    <List>
      {roomList.map((room) => (
        <RoomListItem
          key={room.id}
          data={room}
          current={room.id === currentRoom.id}
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

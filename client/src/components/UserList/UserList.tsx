import React, {
  FC,
  useContext,
  useEffect,
  useState,
} from 'react';
import { List } from '@material-ui/core';

import socket from '../../socket';
import IUser from '../../types/IUser';
import UserListItem from '../UserListItem/UserListItem';
import AppContext from '../../context';

const UserList: FC = () => {
  const { currentRoom } = useContext(AppContext);
  const [userList, setUserList] = useState<IUser[]>([]);

  useEffect(() => {
    socket.emit('online', currentRoom);
    socket.on('online', (data: IUser[]) => {
      setUserList(data);
    });
  });

  return (
    <List>
      {userList.map((user) => (
        <UserListItem
          key={user.name}
          data={user}
        />
      ))}
    </List>
  );
};

export default UserList;

import IRoom from '../types/IRoom';

const getCurrentRoom = (): IRoom => {
  const room = sessionStorage.getItem('currentRoom');

  if (room) {
    return JSON.parse(room);
  }

  return {
    name: '',
    owner: '',
    online: 0,
  };
};

export default getCurrentRoom;

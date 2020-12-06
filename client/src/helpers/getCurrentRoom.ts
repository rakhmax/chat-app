import IRoom from '../types/IRoom';

const getCurrentRoom = (): IRoom | null => {
  const room = sessionStorage.getItem('currentRoom');

  if (room) {
    return JSON.parse(room);
  }

  return null;
};

export default getCurrentRoom;

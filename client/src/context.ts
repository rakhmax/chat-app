import { createContext, Dispatch } from 'react';
import getCurrentRoom from './helpers/getCurrentRoom';
import getUser from './helpers/getUser';
import IRoom from './types/IRoom';
import IUser from './types/IUser';

interface IUserWithSetter extends IUser {
  set: Dispatch<IUser>
}

interface IRoomWithSetter extends IRoom {
  set: Dispatch<IRoom>
}

interface IAppContext {
  user: IUserWithSetter
  currentRoom: IRoomWithSetter
}

export const initialCurrentRoom = {
  ...getCurrentRoom(),
  set: (): void => {},
};

export const initialUser = {
  ...getUser(),
  set: (): void => {},
};

export const initialAppContext: IAppContext = {
  currentRoom: initialCurrentRoom,
  user: initialUser,
};

const AppContext = createContext<IAppContext>(initialAppContext);

export default AppContext;

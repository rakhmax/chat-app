import IUser from '../types/IUser';

const getUser = (): IUser | null => {
  const user = sessionStorage.getItem('user');

  if (user) {
    return JSON.parse(user);
  }

  return null;
};

export default getUser;

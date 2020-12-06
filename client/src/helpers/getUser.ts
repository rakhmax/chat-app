import IUser from '../types/IUser';

const getUser = (): IUser => {
  const user = sessionStorage.getItem('user');

  if (user) {
    return JSON.parse(user);
  }

  return {
    name: '',
  };
};

export default getUser;

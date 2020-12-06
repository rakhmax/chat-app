import { Dispatch } from 'react';
import IUser from '../../types/IUser';
import IMessage from '../Message/propTypes';

export default interface PropTypes {
  user?: IUser
  sendMessage: Dispatch<IMessage>
}

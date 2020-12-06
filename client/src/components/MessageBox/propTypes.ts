import { Dispatch } from 'react';
import IMessage from '../Message/propTypes';

export default interface PropTypes {
  sendMessage: Dispatch<IMessage>
}

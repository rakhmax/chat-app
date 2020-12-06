import IStatus from './IStatus';

export default interface IRoom {
  name: string
  owner: string
  online: number
}

export interface IRoomWithStatus extends IRoom {
  msg: IStatus
}

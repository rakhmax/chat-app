import IUser from './IUser';

export interface IClientRoom {
  user: IUser
  room: IRoom
}

export default interface IRoom {
  name: string
  owner: string
  members: IUser[]
  online: number
}

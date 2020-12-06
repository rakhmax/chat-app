import IRoom from '../../types/IRoom';

export default interface IRoomListItem {
  data: IRoom
  current?: boolean
  lastMsg?: Record<string, string>
}

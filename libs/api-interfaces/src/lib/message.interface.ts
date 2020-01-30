export interface IMessage {
  room: string;
  text: string;
}

export enum EventType {
  Message = 'EVENT_MESSAGE',
  JoinRoom = 'EVENT_JOIN_ROOM',
  LeaveRoom = 'EVENT_LEAVE_ROOM',
  GetCount = 'EVENT_GET_COUNT',
  UpdateCount = 'EVENT_UPDATE_USER_COUNT',
}

export interface IEvent {
  event: EventType;
  data?: any;
}

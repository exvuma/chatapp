export type RoomType = {
  name: string;
  members: string[];
  id: string;
  time: number;
  author: string;
};

export type MsgType = {
  message: string;
  author: string;
  time: number;
  roomId: string;
};

import { GifOverlayProps } from '@giphy/react-components';

export type IGif = GifOverlayProps['gif'];

export type RoomType = {
  name: string;
  members: string[];
  id: string;
  time: number;
  author: string;
};

export type MsgType = {
  message: string;
  gif: IGif | null;
  author: string;
  time: number;
  roomId: string;
};

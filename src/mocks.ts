import { RoomType, MsgType, IGif } from './types';
export const MOCK_ROOMS: RoomType[] = [
  {
    name: 'Home',
    id: 'home',
    author: 'Home',
    time: 1603741045962,
    members: [],
  },
  {
    name: 'Room 1',
    id: 'room1',
    author: 'John',
    time: 1603741045962,
    members: ['Victoria', 'John'],
  },
  {
    name: 'Room 2',
    id: 'room2',
    author: 'Victoria',
    time: 1603741045963,
    members: ['Victoria', 'John'],
  },
];
export const MOCK_MSGS: MsgType[] = [
  {
    message: 'Hi there',
    author: 'John',
    time: 1603741045962,
    roomId: 'this',
    gif: null,
  },
  {
    message: "What's up",
    author: 'Victoria',
    time: 1603741045963,
    roomId: 'room2',
    gif: null,
  },
];
export const MOCK_GIF: IGif = {
  type: 'gif',
  id: '2gtoSIzdrSMFO',
  url: 'https://giphy.com/gifs/winner-2gtoSIzdrSMFO',
  slug: 'winner-2gtoSIzdrSMFO',
  bitly_gif_url: 'http://gph.is/2cTuvrf',
  bitly_url: 'http://gph.is/2cTuvrf',
  embed_url: 'https://giphy.com/embed/2gtoSIzdrSMFO',
  username: '',
  source: 'http://twinsdaily.com/gallery/image/239-winner/',
  title: 'winner GIF',
  rating: 'g',
  content_url: '',
  source_tld: 'twinsdaily.com',
  source_post_url: 'http://twinsdaily.com/gallery/image/239-winner/',
  is_sticker: false,
  import_datetime: '2016-09-17 23:45:52',
  trending_datetime: '0000-00-00 00:00:00',
  images: {
    original: {
      height: 480,
      width: 640,
      size: '209957',
      url:
        'https://media0.giphy.com/media/2gtoSIzdrSMFO/giphy.gif?cid=6ec83770glx4hn7gx4d0hn9zy8ds3g5ljocytfy26sddd7ri&rid=giphy.gif',
      mp4_size: '99127',
      mp4:
        'https://media0.giphy.com/media/2gtoSIzdrSMFO/giphy.mp4?cid=6ec83770glx4hn7gx4d0hn9zy8ds3g5ljocytfy26sddd7ri&rid=giphy.mp4',
      webp_size: '200778',
      webp:
        'https://media0.giphy.com/media/2gtoSIzdrSMFO/giphy.webp?cid=6ec83770glx4hn7gx4d0hn9zy8ds3g5ljocytfy26sddd7ri&rid=giphy.webp',
      frames: '3',
      hash: 'bad790e30f259275d05ea025f6e56643',
    },
    downsized: {
      height: 480,
      width: 640,
      size: '209957',
      url:
        'https://media0.giphy.com/media/2gtoSIzdrSMFO/giphy.gif?cid=6ec83770glx4hn7gx4d0hn9zy8ds3g5ljocytfy26sddd7ri&rid=giphy.gif',
    },
    downsized_large: {
      height: 480,
      width: 640,
      size: '209957',
      url:
        'https://media0.giphy.com/media/2gtoSIzdrSMFO/giphy.gif?cid=6ec83770glx4hn7gx4d0hn9zy8ds3g5ljocytfy26sddd7ri&rid=giphy.gif',
    },
    downsized_medium: {
      height: 480,
      width: 640,
      size: '209957',
      url:
        'https://media0.giphy.com/media/2gtoSIzdrSMFO/giphy.gif?cid=6ec83770glx4hn7gx4d0hn9zy8ds3g5ljocytfy26sddd7ri&rid=giphy.gif',
    },
    downsized_small: {
      height: 432,
      width: 576,
      mp4_size: '81598',
      mp4:
        'https://media0.giphy.com/media/2gtoSIzdrSMFO/giphy-downsized-small.mp4?cid=6ec83770glx4hn7gx4d0hn9zy8ds3g5ljocytfy26sddd7ri&rid=giphy-downsized-small.mp4',
    },
    downsized_still: {
      height: 480,
      width: 640,
      size: '209957',
      url:
        'https://media0.giphy.com/media/2gtoSIzdrSMFO/giphy_s.gif?cid=6ec83770glx4hn7gx4d0hn9zy8ds3g5ljocytfy26sddd7ri&rid=giphy_s.gif',
    },
    fixed_height: {
      height: 200,
      width: 267,
      size: '53310',
      url:
        'https://media0.giphy.com/media/2gtoSIzdrSMFO/200.gif?cid=6ec83770glx4hn7gx4d0hn9zy8ds3g5ljocytfy26sddd7ri&rid=200.gif',
      mp4_size: '38584',
      mp4:
        'https://media0.giphy.com/media/2gtoSIzdrSMFO/200.mp4?cid=6ec83770glx4hn7gx4d0hn9zy8ds3g5ljocytfy26sddd7ri&rid=200.mp4',
      webp_size: '39060',
      webp:
        'https://media0.giphy.com/media/2gtoSIzdrSMFO/200.webp?cid=6ec83770glx4hn7gx4d0hn9zy8ds3g5ljocytfy26sddd7ri&rid=200.webp',
    },
    fixed_height_downsampled: {
      height: 200,
      width: 267,
      size: '53310',
      url:
        'https://media0.giphy.com/media/2gtoSIzdrSMFO/200_d.gif?cid=6ec83770glx4hn7gx4d0hn9zy8ds3g5ljocytfy26sddd7ri&rid=200_d.gif',
      webp_size: '45958',
      webp:
        'https://media0.giphy.com/media/2gtoSIzdrSMFO/200_d.webp?cid=6ec83770glx4hn7gx4d0hn9zy8ds3g5ljocytfy26sddd7ri&rid=200_d.webp',
    },
    fixed_height_small: {
      height: 100,
      width: 134,
      size: '20598',
      url:
        'https://media0.giphy.com/media/2gtoSIzdrSMFO/100.gif?cid=6ec83770glx4hn7gx4d0hn9zy8ds3g5ljocytfy26sddd7ri&rid=100.gif',
      mp4_size: '16077',
      mp4:
        'https://media0.giphy.com/media/2gtoSIzdrSMFO/100.mp4?cid=6ec83770glx4hn7gx4d0hn9zy8ds3g5ljocytfy26sddd7ri&rid=100.mp4',
      webp_size: '15994',
      webp:
        'https://media0.giphy.com/media/2gtoSIzdrSMFO/100.webp?cid=6ec83770glx4hn7gx4d0hn9zy8ds3g5ljocytfy26sddd7ri&rid=100.webp',
    },
    fixed_height_small_still: {
      height: 100,
      width: 134,
      size: '8935',
      url:
        'https://media0.giphy.com/media/2gtoSIzdrSMFO/100_s.gif?cid=6ec83770glx4hn7gx4d0hn9zy8ds3g5ljocytfy26sddd7ri&rid=100_s.gif',
    },
    fixed_height_still: {
      height: 200,
      width: 267,
      size: '18866',
      url:
        'https://media0.giphy.com/media/2gtoSIzdrSMFO/200_s.gif?cid=6ec83770glx4hn7gx4d0hn9zy8ds3g5ljocytfy26sddd7ri&rid=200_s.gif',
    },
    fixed_width: {
      height: 150,
      width: 200,
      size: '36963',
      url:
        'https://media0.giphy.com/media/2gtoSIzdrSMFO/200w.gif?cid=6ec83770glx4hn7gx4d0hn9zy8ds3g5ljocytfy26sddd7ri&rid=200w.gif',
      mp4_size: '26828',
      mp4:
        'https://media0.giphy.com/media/2gtoSIzdrSMFO/200w.mp4?cid=6ec83770glx4hn7gx4d0hn9zy8ds3g5ljocytfy26sddd7ri&rid=200w.mp4',
      webp_size: '27182',
      webp:
        'https://media0.giphy.com/media/2gtoSIzdrSMFO/200w.webp?cid=6ec83770glx4hn7gx4d0hn9zy8ds3g5ljocytfy26sddd7ri&rid=200w.webp',
    },
    fixed_width_downsampled: {
      height: 150,
      width: 200,
      size: '36963',
      url:
        'https://media0.giphy.com/media/2gtoSIzdrSMFO/200w_d.gif?cid=6ec83770glx4hn7gx4d0hn9zy8ds3g5ljocytfy26sddd7ri&rid=200w_d.gif',
      webp_size: '30810',
      webp:
        'https://media0.giphy.com/media/2gtoSIzdrSMFO/200w_d.webp?cid=6ec83770glx4hn7gx4d0hn9zy8ds3g5ljocytfy26sddd7ri&rid=200w_d.webp',
    },
    fixed_width_small: {
      height: 75,
      width: 10,
      size: '14020',
      url:
        'https://media0.giphy.com/media/2gtoSIzdrSMFO/100w.gif?cid=6ec83770glx4hn7gx4d0hn9zy8ds3g5ljocytfy26sddd7ri&rid=100w.gif',
      mp4_size: '10929',
      mp4:
        'https://media0.giphy.com/media/2gtoSIzdrSMFO/100w.mp4?cid=6ec83770glx4hn7gx4d0hn9zy8ds3g5ljocytfy26sddd7ri&rid=100w.mp4',
      webp_size: '10628',
      webp:
        'https://media0.giphy.com/media/2gtoSIzdrSMFO/100w.webp?cid=6ec83770glx4hn7gx4d0hn9zy8ds3g5ljocytfy26sddd7ri&rid=100w.webp',
    },
    fixed_width_small_still: {
      height: 75,
      width: 10,
      size: '5251',
      url:
        'https://media0.giphy.com/media/2gtoSIzdrSMFO/100w_s.gif?cid=6ec83770glx4hn7gx4d0hn9zy8ds3g5ljocytfy26sddd7ri&rid=100w_s.gif',
    },
    fixed_width_still: {
      height: 150,
      width: 200,
      size: '14433',
      url:
        'https://media0.giphy.com/media/2gtoSIzdrSMFO/200w_s.gif?cid=6ec83770glx4hn7gx4d0hn9zy8ds3g5ljocytfy26sddd7ri&rid=200w_s.gif',
    },
    looping: {
      mp4_size: '2366055',
      mp4:
        'https://media0.giphy.com/media/2gtoSIzdrSMFO/giphy-loop.mp4?cid=6ec83770glx4hn7gx4d0hn9zy8ds3g5ljocytfy26sddd7ri&rid=giphy-loop.mp4',
    },
    original_still: {
      height: 480,
      width: 640,
      size: '73868',
      url:
        'https://media0.giphy.com/media/2gtoSIzdrSMFO/giphy_s.gif?cid=6ec83770glx4hn7gx4d0hn9zy8ds3g5ljocytfy26sddd7ri&rid=giphy_s.gif',
    },
    original_mp4: {
      height: 360,
      width: 480,
      mp4_size: '99127',
      mp4:
        'https://media0.giphy.com/media/2gtoSIzdrSMFO/giphy.mp4?cid=6ec83770glx4hn7gx4d0hn9zy8ds3g5ljocytfy26sddd7ri&rid=giphy.mp4',
    },
    preview: {
      height: 216,
      width: 288,
      mp4_size: '28959',
      mp4:
        'https://media0.giphy.com/media/2gtoSIzdrSMFO/giphy-preview.mp4?cid=6ec83770glx4hn7gx4d0hn9zy8ds3g5ljocytfy26sddd7ri&rid=giphy-preview.mp4',
    },
    preview_gif: {
      height: 123,
      width: 164,
      size: '49801',
      url:
        'https://media0.giphy.com/media/2gtoSIzdrSMFO/giphy-preview.gif?cid=6ec83770glx4hn7gx4d0hn9zy8ds3g5ljocytfy26sddd7ri&rid=giphy-preview.gif',
    },
    preview_webp: {
      height: 178,
      width: 238,
      size: '33954',
      url:
        'https://media0.giphy.com/media/2gtoSIzdrSMFO/giphy-preview.webp?cid=6ec83770glx4hn7gx4d0hn9zy8ds3g5ljocytfy26sddd7ri&rid=giphy-preview.webp',
    },
    '480w_still': {
      height: 360,
      width: 480,
      size: '209957',
      url:
        'https://media0.giphy.com/media/2gtoSIzdrSMFO/480w_s.jpg?cid=6ec83770glx4hn7gx4d0hn9zy8ds3g5ljocytfy26sddd7ri&rid=480w_s.jpg',
    },
  },
  analytics_response_payload:
    'e=Z2lmX2lkPTJndG9TSXpkclNNRk8mZXZlbnRfdHlwZT1HSUZfU0VBUkNIJmNpZD02ZWM4Mzc3MGdseDRobjdneDRkMGhuOXp5OGRzM2c1bGpvY3l0ZnkyNnNkZGQ3cmk',
  analytics: {
    onload: {
      url:
        'https://giphy-analytics.giphy.com/simple_analytics?response_id=glx4hn7gx4d0hn9zy8ds3g5ljocytfy26sddd7ri&event_type=GIF_SEARCH&gif_id=2gtoSIzdrSMFO&action_type=SEEN',
    },
    onclick: {
      url:
        'https://giphy-analytics.giphy.com/simple_analytics?response_id=glx4hn7gx4d0hn9zy8ds3g5ljocytfy26sddd7ri&event_type=GIF_SEARCH&gif_id=2gtoSIzdrSMFO&action_type=CLICK',
    },
    onsent: {
      url:
        'https://giphy-analytics.giphy.com/simple_analytics?response_id=glx4hn7gx4d0hn9zy8ds3g5ljocytfy26sddd7ri&event_type=GIF_SEARCH&gif_id=2gtoSIzdrSMFO&action_type=SENT',
    },
  },
  tags: [],
  is_anonymous: false,
  is_community: false,
  is_featured: false,
  is_hidden: false,
  is_indexable: false,
  is_preserve_size: false,
  is_realtime: false,
  is_removed: false,
};

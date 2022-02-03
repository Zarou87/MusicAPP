import { IAlbum } from './album.model';

export interface ISong {
  _id: string;
  number: string;
  name: string;
  duration: number;
  album: IAlbum;
}

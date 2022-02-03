import { IArtist } from './artist.model';

export interface IAlbum {
  _id: string;
  title: string;
  description: string;
  year: number;
  image: string;
  artist: IArtist;
}

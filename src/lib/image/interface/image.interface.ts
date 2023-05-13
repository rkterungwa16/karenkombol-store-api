import { ImageTypes } from '../constants';

export interface IMage {
  _id: string;
  name: string;
  fileId: string;
  url: string;
  imageType?: ImageTypes;
  createdAt?: Date;
  updatedAt?: Date;
}

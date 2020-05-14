import { IUser } from 'app/shared/model/user.model';

export interface IStade {
  id?: number;
  nom?: string;
  adresse?: string;
  codePostal?: string;
  ville?: string;
  user?: IUser;
}

export const defaultValue: Readonly<IStade> = {};

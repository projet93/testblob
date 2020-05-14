import { IUser } from 'app/shared/model/user.model';
import { ICategorie } from 'app/shared/model/categorie.model';

export interface IClub {
  id?: number;
  nom?: string;
  adresse?: string;
  telephone?: string;
  logoContentType?: string;
  logo?: any;
  email?: string;
  user?: IUser;
  categories?: ICategorie[];
}

export const defaultValue: Readonly<IClub> = {};

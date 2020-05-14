import { IUser } from 'app/shared/model/user.model';
import { ICategorie } from 'app/shared/model/categorie.model';

export interface IReferent {
  id?: number;
  nom?: string;
  prenom?: string;
  licence?: string;
  telephone?: string;
  email?: string;
  user?: IUser;
  categories?: ICategorie[];
}

export const defaultValue: Readonly<IReferent> = {};

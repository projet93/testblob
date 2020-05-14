import { IUser } from 'app/shared/model/user.model';
import { IReferent } from 'app/shared/model/referent.model';
import { IPlateau } from 'app/shared/model/plateau.model';

export interface IInscription {
  id?: number;
  nombreEquipe?: number;
  preinscription?: boolean;
  user?: IUser;
  referent?: IReferent;
  plateau?: IPlateau;
}

export const defaultValue: Readonly<IInscription> = {
  preinscription: false
};

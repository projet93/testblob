import { Moment } from 'moment';
import { IDocumentPlateau } from 'app/shared/model/document-plateau.model';
import { IInscription } from 'app/shared/model/inscription.model';
import { IReferent } from 'app/shared/model/referent.model';
import { IUser } from 'app/shared/model/user.model';
import { IStade } from 'app/shared/model/stade.model';
import { ICategorie } from 'app/shared/model/categorie.model';

export const enum Statut {
  ENATTENTE = 'ENATTENTE',
  ENCOURS = 'ENCOURS',
  COMPLET = 'COMPLET',
  CLOTURE = 'CLOTURE'
}

export interface IPlateau {
  id?: number;
  dateDebut?: Moment;
  dateFin?: Moment;
  nombreEquipeMax?: number;
  nombreEquipe?: number;
  statut?: Statut;
  valid?: boolean;
  version?: number;
  documentPlateau?: IDocumentPlateau;
  inscriptions?: IInscription[];
  referent?: IReferent;
  user?: IUser;
  stade?: IStade;
  categorie?: ICategorie;
}

export const defaultValue: Readonly<IPlateau> = {
  valid: false
};

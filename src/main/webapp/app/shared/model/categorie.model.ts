import { IClub } from 'app/shared/model/club.model';
import { IReferent } from 'app/shared/model/referent.model';

export const enum Section {
  U6 = 'U6',
  U7 = 'U7',
  U8 = 'U8',
  U9 = 'U9'
}

export interface ICategorie {
  id?: number;
  section?: Section;
  descrition?: string;
  clubs?: IClub[];
  referents?: IReferent[];
}

export const defaultValue: Readonly<ICategorie> = {};

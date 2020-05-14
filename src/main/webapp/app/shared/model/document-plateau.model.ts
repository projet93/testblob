import { IPlateau } from 'app/shared/model/plateau.model';

export interface IDocumentPlateau {
  id?: number;
  programmeContentType?: string;
  programme?: any;
  plateau?: IPlateau;
}

export const defaultValue: Readonly<IDocumentPlateau> = {};

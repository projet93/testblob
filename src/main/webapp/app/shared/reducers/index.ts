import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
import sessions, { SessionsState } from 'app/modules/account/sessions/sessions.reducer';
// prettier-ignore
import club, {
  ClubState
} from 'app/entities/club/club.reducer';
// prettier-ignore
import stade, {
  StadeState
} from 'app/entities/stade/stade.reducer';
// prettier-ignore
import categorie, {
  CategorieState
} from 'app/entities/categorie/categorie.reducer';
// prettier-ignore
import referent, {
  ReferentState
} from 'app/entities/referent/referent.reducer';
// prettier-ignore
import plateau, {
  PlateauState
} from 'app/entities/plateau/plateau.reducer';
// prettier-ignore
import documentPlateau, {
  DocumentPlateauState
} from 'app/entities/document-plateau/document-plateau.reducer';
// prettier-ignore
import inscription, {
  InscriptionState
} from 'app/entities/inscription/inscription.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly sessions: SessionsState;
  readonly club: ClubState;
  readonly stade: StadeState;
  readonly categorie: CategorieState;
  readonly referent: ReferentState;
  readonly plateau: PlateauState;
  readonly documentPlateau: DocumentPlateauState;
  readonly inscription: InscriptionState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  sessions,
  club,
  stade,
  categorie,
  referent,
  plateau,
  documentPlateau,
  inscription,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;

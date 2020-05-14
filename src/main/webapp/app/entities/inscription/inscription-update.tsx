import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntities as getReferents } from 'app/entities/referent/referent.reducer';
import { getEntities as getPlateaus } from 'app/entities/plateau/plateau.reducer';
import { getEntity, updateEntity, createEntity, reset } from './inscription.reducer';
// tslint:disable-next-line:no-unused-variable

import { getSession } from 'app/shared/reducers/authentication';



export interface IInscriptionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> { }

export interface IInscriptionUpdateState {
  isNew: boolean;
  userId: string;
  referentId: string;
  plateauId: string;
  preinscription: boolean;
}

export class InscriptionUpdate extends React.Component<IInscriptionUpdateProps, IInscriptionUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      userId: '0',
      referentId: '0',
      plateauId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id,
      preinscription: false
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    window.console.log(this.props.match.params.id);
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }
    this.props.getSession();
    this.props.getUsers();
    this.props.getReferents();
    this.props.getPlateaus();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { inscriptionEntity } = this.props;
      const entity = {
        ...inscriptionEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/plateau');
  };


  render() {
    const { inscriptionEntity, users, referents, plateaus, loading, updating, account } = this.props;
    const { isNew } = this.state;
    const preinscription = localStorage.getItem('plus') === 'plus' && this.state.isNew;
    const usersList = users.filter(user => (user.login !== 'system' && user.login !== 'admin' && user.login !== 'user' && user.login !== localStorage.getItem('login')));
    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="p93App.inscription.home.createOrEditLabel">Create or edit a Inscription</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
                <AvForm model={isNew ? {} : inscriptionEntity} onSubmit={this.saveEntity}>
                  {!isNew ? (
                    <AvGroup>
                      <Label for="inscription-id">ID</Label>
                      <AvInput id="inscription-id" type="text" className="form-control" name="id" required readOnly />
                    </AvGroup>
                  ) : null}
                  <AvGroup>
                    <Label for="inscription-plateau">
                      Plateau
                  </Label>
                    <AvInput id="inscription-plateau" type="text" className="form-control" name="plateau.id" value={localStorage.getItem('plateauId')} readOnly />
                  </AvGroup>
                  <AvGroup>
                    <Label id="nombreEquipeLabel" for="inscription-nombreEquipe">
                      Nombre Equipe
                  </Label>
                    <AvField
                      id="inscription-nombreEquipe"
                      type="number"
                      className="form-control"
                      name="nombreEquipe"
                      validate={{
                        required: { value: true, errorMessage: 'This field is required.' },
                        number: { value: true, errorMessage: 'This field should be a number.' }
                      }}
                    />
                  </AvGroup>
                  <AvInput id="inscription-preinscription" type="hidden" value={!preinscription} className="form-control" name="preinscription" />

                  {
                    preinscription ?
                      (<AvGroup>
                        <Label for="inscription-user">Club</Label>
                        <AvInput id="inscription-user" type="select" className="form-control" name="user.id">
                          <option value='0' key="0"></option>
                          {usersList
                            ? usersList.map(otherEntity => (
                              <option value={otherEntity.id} key={otherEntity.id}>
                                {otherEntity.firstName}
                              </option>
                            ))
                            : null}
                        </AvInput>
                      </AvGroup>) :
                      <AvInput id="inscription-user" type="hidden" className="form-control" name="user.id" value={account.id} />
                  }
                  {
                    !preinscription ?
                      (<AvGroup>
                        <Label for="inscription-referent">Referent</Label>
                        <AvInput id="inscription-referent" type="select" className="form-control" name="referent.id">
                        <option value='0' key="0"></option>
                          {referents
                            ? referents.map(otherEntity => (
                              <option value={otherEntity.id} key={otherEntity.id}>
                                {otherEntity.nom}
                              </option>
                            ))
                            : null}
                        </AvInput>
                      </AvGroup>) :
                      null}

                  <Button tag={Link} id="cancel-save" to="/entity/plateau" replace color="info">
                    <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">Back</span>
                  </Button>
                &nbsp;
                  <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                    <FontAwesomeIcon icon="save" />
                  &nbsp; Save
                </Button>
                </AvForm>
              )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  users: storeState.userManagement.users,
  account: storeState.authentication.account,
  referents: storeState.referent.entities,
  plateaus: storeState.plateau.entities,
  inscriptionEntity: storeState.inscription.entity,
  loading: storeState.inscription.loading,
  updating: storeState.inscription.updating,
  updateSuccess: storeState.inscription.updateSuccess
});

const mapDispatchToProps = {
  getUsers,
  getSession,
  getReferents,
  getPlateaus,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InscriptionUpdate);

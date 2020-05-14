import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { ICategorie } from 'app/shared/model/categorie.model';
import { getEntities as getCategories } from 'app/entities/categorie/categorie.reducer';
import { getEntity, updateEntity, createEntity, reset } from './referent.reducer';
import { IReferent } from 'app/shared/model/referent.model';
// tslint:disable-next-line:no-unused-variable
import { getSession } from 'app/shared/reducers/authentication';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IReferentUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IReferentUpdateState {
  isNew: boolean;
  idscategorie: any[];
  userId: string;
}

export class ReferentUpdate extends React.Component<IReferentUpdateProps, IReferentUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idscategorie: [],
      userId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getUsers();
    this.props.getCategories();
    this.props.getSession();

  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { referentEntity } = this.props;
      const entity = {
        ...referentEntity,
        ...values,
        categories: mapIdList(values.categories)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/referent');
  };

  render() {
    const { referentEntity, users, categories, loading, updating, account } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="p93App.referent.home.createOrEditLabel">Create or edit a Referent</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : referentEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="referent-id">ID</Label>
                    <AvInput id="referent-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nomLabel" for="referent-nom">
                    Nom
                  </Label>
                  <AvField
                    id="referent-nom"
                    type="text"
                    name="nom"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="prenomLabel" for="referent-prenom">
                    Prenom
                  </Label>
                  <AvField
                    id="referent-prenom"
                    type="text"
                    name="prenom"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="licenceLabel" for="referent-licence">
                    Licence
                  </Label>
                  <AvField id="referent-licence" type="text" name="licence" />
                </AvGroup>
                <AvGroup>
                  <Label id="telephoneLabel" for="referent-telephone">
                    Telephone
                  </Label>
                  <AvField id="referent-telephone" type="text" name="telephone" />
                </AvGroup>
                <AvGroup>
                  <Label id="emailLabel" for="referent-email">
                    Email
                  </Label>
                  <AvField id="referent-email" type="text" name="email" />
                </AvGroup>
                
                <AvInput id="referent-user" type="hidden" className="form-control" name="user.id" value={account.id} />

                <AvGroup>
                  <Label for="referent-categorie">Categorie</Label>
                  <AvInput
                    id="referent-categorie"
                    type="select"
                    multiple
                    className="form-control"
                    name="categories"
                    value={referentEntity.categories && referentEntity.categories.map(e => e.id)}
                  >
                    {categories
                      ? categories.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.section}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/referent" replace color="info">
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
  account: storeState.authentication.account,
  users: storeState.userManagement.users,
  categories: storeState.categorie.entities,
  referentEntity: storeState.referent.entity,
  loading: storeState.referent.loading,
  updating: storeState.referent.updating,
  updateSuccess: storeState.referent.updateSuccess
});

const mapDispatchToProps = {
  getUsers,
  getCategories,
  getEntity,
  updateEntity,
  createEntity,
  getSession,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReferentUpdate);

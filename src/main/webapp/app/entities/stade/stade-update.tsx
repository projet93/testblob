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
import { getEntity, updateEntity, createEntity, reset } from './stade.reducer';
import { IStade } from 'app/shared/model/stade.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { getSession } from 'app/shared/reducers/authentication';


export interface IStadeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> { }

export interface IStadeUpdateState {
  isNew: boolean;
  userId: string;
}

export class StadeUpdate extends React.Component<IStadeUpdateProps, IStadeUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
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
    this.props.getSession();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { stadeEntity } = this.props;
      const entity = {
        ...stadeEntity,
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
    this.props.history.push('/entity/stade');
  };

  render() {
    const { stadeEntity, users, loading, updating, account } = this.props;
    const { isNew } = this.state;
    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="p93App.stade.home.createOrEditLabel">Create or edit a Stade</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
                <AvForm model={isNew ? {} : stadeEntity} onSubmit={this.saveEntity}>
                  {!isNew ? (
                    <AvGroup>
                      <Label for="stade-id">ID</Label>
                      <AvInput id="stade-id" type="text" className="form-control" name="id" required readOnly />
                    </AvGroup>
                  ) : null}
                  <AvGroup>
                    <Label id="nomLabel" for="stade-nom">
                      Nom
                  </Label>
                    <AvField
                      id="stade-nom"
                      type="text"
                      name="nom"
                      validate={{
                        required: { value: true, errorMessage: 'This field is required.' }
                      }}
                    />
                  </AvGroup>
                  <AvGroup>
                    <Label id="adresseLabel" for="stade-adresse">
                      Adresse
                  </Label>
                    <AvField id="stade-adresse" type="text" name="adresse" />
                  </AvGroup>
                  <AvGroup>
                    <Label id="codePostalLabel" for="stade-codePostal">
                      Code Postal
                  </Label>
                    <AvField id="stade-codePostal" type="text" name="codePostal" />
                  </AvGroup>
                  <AvGroup>
                    <Label id="villeLabel" for="stade-ville">
                      Ville
                  </Label>
                    <AvField id="stade-ville" type="text" name="ville" />
                  </AvGroup>

                  <AvInput id="stade-user" type="hidden" className="form-control" name="user.id" value={account.id} />

                  <Button tag={Link} id="cancel-save" to="/entity/stade" replace color="info">
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
  stadeEntity: storeState.stade.entity,
  loading: storeState.stade.loading,
  updating: storeState.stade.updating,
  updateSuccess: storeState.stade.updateSuccess
});

const mapDispatchToProps = {
  getUsers,
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
)(StadeUpdate);

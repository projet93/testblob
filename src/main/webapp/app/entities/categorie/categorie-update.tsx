import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IClub } from 'app/shared/model/club.model';
import { getEntities as getClubs } from 'app/entities/club/club.reducer';
import { IReferent } from 'app/shared/model/referent.model';
import { getEntities as getReferents } from 'app/entities/referent/referent.reducer';
import { getEntity, updateEntity, createEntity, reset } from './categorie.reducer';
import { ICategorie } from 'app/shared/model/categorie.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICategorieUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICategorieUpdateState {
  isNew: boolean;
  clubId: string;
  referentId: string;
}

export class CategorieUpdate extends React.Component<ICategorieUpdateProps, ICategorieUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      clubId: '0',
      referentId: '0',
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

    this.props.getClubs();
    this.props.getReferents();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { categorieEntity } = this.props;
      const entity = {
        ...categorieEntity,
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
    this.props.history.push('/entity/categorie');
  };

  render() {
    const { categorieEntity, clubs, referents, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="p93App.categorie.home.createOrEditLabel">Create or edit a Categorie</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : categorieEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="categorie-id">ID</Label>
                    <AvInput id="categorie-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="sectionLabel" for="categorie-section">
                    Section
                  </Label>
                  <AvInput
                    id="categorie-section"
                    type="select"
                    className="form-control"
                    name="section"
                    value={(!isNew && categorieEntity.section) || 'U6'}
                  >
                    <option value="U6">U6</option>
                    <option value="U7">U7</option>
                    <option value="U8">U8</option>
                    <option value="U9">U9</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="descritionLabel" for="categorie-descrition">
                    Descrition
                  </Label>
                  <AvField id="categorie-descrition" type="text" name="descrition" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/categorie" replace color="info">
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
  clubs: storeState.club.entities,
  referents: storeState.referent.entities,
  categorieEntity: storeState.categorie.entity,
  loading: storeState.categorie.loading,
  updating: storeState.categorie.updating,
  updateSuccess: storeState.categorie.updateSuccess
});

const mapDispatchToProps = {
  getClubs,
  getReferents,
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
)(CategorieUpdate);

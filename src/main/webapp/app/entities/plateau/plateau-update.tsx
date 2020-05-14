import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IDocumentPlateau } from 'app/shared/model/document-plateau.model';
import { getEntities as getDocumentPlateaus } from 'app/entities/document-plateau/document-plateau.reducer';
import { IReferent } from 'app/shared/model/referent.model';
import { getEntities as getReferents } from 'app/entities/referent/referent.reducer';
import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IStade } from 'app/shared/model/stade.model';
import { getEntities as getStades } from 'app/entities/stade/stade.reducer';
import { ICategorie } from 'app/shared/model/categorie.model';
import { getEntities as getCategories } from 'app/entities/categorie/categorie.reducer';
import { getEntity, updateEntity, createEntity, reset } from './plateau.reducer';
import { IPlateau } from 'app/shared/model/plateau.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { getSession } from 'app/shared/reducers/authentication';
import { DocumentPlateauUpdate } from '../document-plateau/document-plateau-update';

export interface IPlateauUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> { }

export const PlateauUpdate = (props: IPlateauUpdateProps) => {
  const [documentPlateauId, setDocumentPlateauId] = useState('0');
  const [referentId, setReferentId] = useState('0');
  const [userId, setUserId] = useState('0');
  const [stadeId, setStadeId] = useState('0');
  const [categorieId, setCategorieId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { plateauEntity, documentPlateaus, referents, users, stades, categories, loading, updating, account} = props;
  const handleClose = () => {
    props.history.push('/entity/plateau' + props.location.search);
  };
  
  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
    props.getSession();
    props.getReferents();
    props.getStades();
    props.getCategories();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.dateDebut = convertDateTimeToServer(values.dateDebut);
    values.dateFin = convertDateTimeToServer(values.dateFin);

    if (errors.length === 0) {
      const entity = {
        ...plateauEntity,
        ...values
      };
      entity.user = users[values.user];

      if (isNew) {
        props.createEntity(entity);
      } else {
        entity.user = plateauEntity.user;
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="App.plateau.home.createOrEditLabel">Create or edit a Plateau</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
              <AvForm model={isNew ? {} : plateauEntity} onSubmit={saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="plateau-id">ID</Label>
                    <AvInput id="plateau-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <Row>
                  <Col md="6">
                    <AvGroup>
                      <Label id="dateDebutLabel" for="plateau-dateDebut">
                        Date Debut
                </Label>
                      <AvInput
                        id="plateau-dateDebut"
                        type="datetime-local"
                        className="form-control"
                        name="dateDebut"
                        placeholder={'YYYY-MM-DD HH:mm'}
                        value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.plateauEntity.dateDebut)}
                        validate={{
                          required: { value: true, errorMessage: 'This field is required.' }
                        }}
                      />
                    </AvGroup>
                  </Col>
                  <Col md="6">
                    <AvGroup>
                      <Label id="dateFinLabel" for="plateau-dateFin">
                        Date Fin
                </Label>
                      <AvInput
                        id="plateau-dateFin"
                        type="datetime-local"
                        className="form-control"
                        name="dateFin"
                        placeholder={'YYYY-MM-DD HH:mm'}
                        value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.plateauEntity.dateFin)}
                      />
                    </AvGroup>
                  </Col>
                </Row>
                <AvGroup>
                  <Label for="plateau-documentPlateau">Document Plateau</Label>
                  <AvInput id="plateau-documentPlateau" type="select" className="form-control" name="documentPlateau.id">
                    <option value="" key="0" />
                    {documentPlateaus
                      ? documentPlateaus.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Row>
                  <Col md="4">
                    <AvGroup>
                      <Label id="nombreEquipeMaxLabel" for="plateau-nombreEquipeMax">
                        Nombre Equipe Max
                      </Label>
                      <AvField id="plateau-nombreEquipeMax" type="number" className="form-control" name="nombreEquipeMax" />
                    </AvGroup>
                  </Col>
                  <Col md="4">
                    <AvGroup>
                      <Label id="nombreEquipeLabel" for="plateau-nombreEquipe">
                        Nombre Equipe
                </Label>
                      <AvField id="plateau-nombreEquipe" type="number" className="form-control" name="nombreEquipe" />
                    </AvGroup>
                  </Col>
                  <Col md="4">
                    <AvGroup>
                      <Label for="plateau-referent">Referent</Label>
                      <AvInput id="plateau-referent" type="select" className="form-control" name="referent.id">
                        <option value="" key="0" />
                        {referents
                          ? referents.map(otherEntity => (
                            <option value={otherEntity.id} key={otherEntity.id}>
                              {otherEntity.nom}
                            </option>
                          ))
                          : null}
                      </AvInput>
                    </AvGroup>
                  </Col>
                </Row>
                <AvInput id="plateau-user" type="hidden" className="form-control" name="user.id" value={account.id}/>

                <AvGroup>
                  <Label for="plateau-stade">Stade</Label>
                  <AvInput id="plateau-stade" type="select" className="form-control" name="stade.id">
                    <option value="" key="0" />
                    {stades
                      ? stades.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.nom}
                        </option>
                      ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="plateau-categorie">Categorie</Label>
                  <AvInput id="plateau-categorie" type="select" className="form-control" name="categorie.id">
                    <option value="" key="0" />
                    {referentId}
                    {categories
                      ? categories.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.section}
                        </option>
                      ))
                      : null}
                  </AvInput>
                </AvGroup>
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
};

const mapStateToProps = (storeState: IRootState) => ({
  documentPlateaus: storeState.documentPlateau.entities,
  account: storeState.authentication.account,
  referents: storeState.referent.entities,
  users: storeState.userManagement.users,
  stades: storeState.stade.entities,
  categories: storeState.categorie.entities,
  plateauEntity: storeState.plateau.entity,
  loading: storeState.plateau.loading,
  updating: storeState.plateau.updating,
  updateSuccess: storeState.plateau.updateSuccess
});

const mapDispatchToProps = {
  getDocumentPlateaus,
  getReferents,
  getUsers,
  getStades,
  getCategories,
  getEntity,
  updateEntity,
  createEntity,
  getSession,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PlateauUpdate);

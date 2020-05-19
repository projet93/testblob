import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Table } from 'reactstrap';
import { Translate, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './plateau.reducer';
import { APP_DATE_FORMAT } from 'app/config/constants';
import inscription from '../inscription/inscription';

export interface IPlateauDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PlateauDetail = (props: IPlateauDetailProps) => {
  useEffect(() => {
    localStorage.setItem('plus', 'plus');
    props.getEntity(props.match.params.id);
  }, []);

  function activetedButton(inscriptionEntity) {
    const loginValue = inscriptionEntity.user ? inscriptionEntity.user.login : null;
    if (loginValue === localStorage.getItem('login')) return true;
    return false;
  }

  const { plateauEntity, match } = props;
  localStorage.setItem('plateauId', '' + plateauEntity.id);
  return (
    <Row>
      <Col md="4">
        <h2>
          Plateau [<b>{plateauEntity.id}</b>] [{plateauEntity.statut}]
        </h2>
        <dl className="row">
          <dt className="col-sm-5">
            <span id="dateDebut">Date Debut</span>
          </dt>
          <dd className="col-sm-7">
            <TextFormat value={plateauEntity.dateDebut} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt className="col-sm-5">
            <span id="dateFin">Date Fin</span>
          </dt>
          <dd className="col-sm-7">
            <TextFormat value={plateauEntity.dateFin} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt className="col-sm-5">
            <span id="programme">Programme</span>
          </dt>
          <dd className="col-sm-7">
            {plateauEntity.documentPlateau ? (
              <div>
                <a onClick={openFile(plateauEntity.documentPlateau.programmeContentType, plateauEntity.documentPlateau.programme)}>
                  Open&nbsp;
                </a>
                <span>
                  {plateauEntity.documentPlateau.programmeContentType}, {byteSize(plateauEntity.documentPlateau.programme)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt className="col-sm-5">
            <span id="nombreEquipeMax">Nombre Equipe Max</span>
          </dt>
          <dd className="col-sm-7">{plateauEntity.nombreEquipeMax}</dd>
          <dt className="col-sm-5">
            <span id="nombreEquipe">Nombre Participant</span>
          </dt>
          <dd className="col-sm-7">{plateauEntity.nombreEquipe}</dd>

          <dt className="col-sm-5">Referent</dt>
          <dd className="col-sm-7">{plateauEntity.referent ? plateauEntity.referent.nom : ''}</dd>
          <dt className="col-sm-5">Club</dt>
          <dd className="col-sm-7">{plateauEntity.user ? plateauEntity.user.firstName + ' [' + plateauEntity.user.login + ']' : ''}</dd>
          <dt className="col-sm-5">Stade</dt>
          <dd className="col-sm-7">{plateauEntity.stade ? plateauEntity.stade.nom : ''}</dd>
          <dt className="col-sm-5">Categorie</dt>
          <dd className="col-sm-7">{plateauEntity.categorie ? plateauEntity.categorie.section : ''}</dd>
        </dl>
        <Button tag={Link} to="/entity/plateau" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        {plateauEntity.user && localStorage.getItem('login') === plateauEntity.user.login ? (
          <Button tag={Link} to={`/entity/plateau/${plateauEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        ) : null}
      </Col>
      <Col md="8">
        <div>
          <h2 id="plateau-heading">
            Inscriptions
            {plateauEntity.user && plateauEntity.user.login !== localStorage.getItem('login') ? null : (
              <Link to={`/entity/inscription/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp; Pre-Inscription
              </Link>
            )}
          </h2>
          <div className="table-responsive">
            {plateauEntity.inscriptions && plateauEntity.inscriptions.length > 0 ? (
              <Table responsive>
                <thead>
                  <tr>
                    <th>Club</th>
                    <th>Referent</th>
                    <th className="text-center">Nombre Equipe</th>
                    <th>Statut</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {plateauEntity.inscriptions.map((inscription, i) => (
                    <tr key={`entity-${i}`}>
                      <td>{inscription.user ? <Link to={`club/${inscription.user.id}`}>{inscription.user.firstName}</Link> : ''}</td>
                      <td>
                        {inscription.referent ? (
                          <Link to={`entity/referent/${inscription.referent.id}`}>{inscription.referent.nom}</Link>
                        ) : (
                          ''
                        )}
                      </td>
                      <td className="text-center">{inscription.nombreEquipe}</td>
                      <td>{inscription.preinscription ? 'pré-inscrit' : 'inscrit'}</td>
                      <td className="text-right">
                        {activetedButton(inscription) && (
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`/entity/inscription/${inscription.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />
                            </Button>
                            <Button tag={Link} to={`/entity/inscription/${inscription.id}/delete`} color="danger" size="sm">
                              <FontAwesomeIcon icon="trash" />
                            </Button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <div className="alert alert-warning">No Inscriptions found</div>
            )}
          </div>
        </div>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ plateau }: IRootState) => ({
  plateauEntity: plateau.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlateauDetail);

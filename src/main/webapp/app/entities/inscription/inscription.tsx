import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './inscription.reducer';
import { IInscription } from 'app/shared/model/inscription.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInscriptionProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Inscription extends React.Component<IInscriptionProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { inscriptionList, match } = this.props;
    return (
      <div>
        <h2 id="inscription-heading">
          Inscriptions
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Inscription
          </Link>
        </h2>
        <div className="table-responsive">
          {inscriptionList && inscriptionList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre Equipe</th>
                  <th>Preinscription</th>
                  <th>User</th>
                  <th>Referent</th>
                  <th>Plateau</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {inscriptionList.map((inscription, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${inscription.id}`} color="link" size="sm">
                        {inscription.id}
                      </Button>
                    </td>
                    <td>{inscription.nombreEquipe}</td>
                    <td>{inscription.preinscription ? 'true' : 'false'}</td>
                    <td>{inscription.user ? inscription.user.login : ''}</td>
                    <td>
                      {inscription.referent ? <Link to={`referent/${inscription.referent.id}`}>{inscription.referent.nom}</Link> : ''}
                    </td>
                    <td>{inscription.plateau ? <Link to={`plateau/${inscription.plateau.id}`}>{inscription.plateau.id}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${inscription.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${inscription.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${inscription.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
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
    );
  }
}

const mapStateToProps = ({ inscription }: IRootState) => ({
  inscriptionList: inscription.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Inscription);

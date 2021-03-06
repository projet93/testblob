import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './inscription.reducer';
import { IInscription } from 'app/shared/model/inscription.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInscriptionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class InscriptionDetail extends React.Component<IInscriptionDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { inscriptionEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Inscription [<b>{inscriptionEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="nombreEquipe">Nombre Equipe</span>
            </dt>
            <dd>{inscriptionEntity.nombreEquipe}</dd>
            <dt>
              <span id="preinscription">Preinscription</span>
            </dt>
            <dd>{inscriptionEntity.preinscription ? 'true' : 'false'}</dd>
            <dt>User</dt>
            <dd>{inscriptionEntity.user ? inscriptionEntity.user.login : ''}</dd>
            <dt>Referent</dt>
            <dd>{inscriptionEntity.referent ? inscriptionEntity.referent.nom : ''}</dd>
            <dt>Plateau</dt>
            <dd>{inscriptionEntity.plateau ? inscriptionEntity.plateau.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/inscription" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/inscription/${inscriptionEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ inscription }: IRootState) => ({
  inscriptionEntity: inscription.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InscriptionDetail);

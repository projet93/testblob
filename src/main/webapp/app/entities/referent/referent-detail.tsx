import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './referent.reducer';
import { IReferent } from 'app/shared/model/referent.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IReferentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ReferentDetail extends React.Component<IReferentDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { referentEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Referent [<b>{referentEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="nom">Nom</span>
            </dt>
            <dd>{referentEntity.nom}</dd>
            <dt>
              <span id="prenom">Prenom</span>
            </dt>
            <dd>{referentEntity.prenom}</dd>
            <dt>
              <span id="licence">Licence</span>
            </dt>
            <dd>{referentEntity.licence}</dd>
            <dt>
              <span id="telephone">Telephone</span>
            </dt>
            <dd>{referentEntity.telephone}</dd>
            <dt>
              <span id="email">Email</span>
            </dt>
            <dd>{referentEntity.email}</dd>
            <dt>User</dt>
            <dd>{referentEntity.user ? referentEntity.user.id : ''}</dd>
            <dt>Categorie</dt>
            <dd>
              {referentEntity.categories
                ? referentEntity.categories.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.section}</a>
                      {i === referentEntity.categories.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/referent" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/referent/${referentEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ referent }: IRootState) => ({
  referentEntity: referent.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReferentDetail);

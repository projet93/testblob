import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './stade.reducer';
import { IStade } from 'app/shared/model/stade.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IStadeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class StadeDetail extends React.Component<IStadeDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { stadeEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Stade [<b>{stadeEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="nom">Nom</span>
            </dt>
            <dd>{stadeEntity.nom}</dd>
            <dt>
              <span id="adresse">Adresse</span>
            </dt>
            <dd>{stadeEntity.adresse}</dd>
            <dt>
              <span id="codePostal">Code Postal</span>
            </dt>
            <dd>{stadeEntity.codePostal}</dd>
            <dt>
              <span id="ville">Ville</span>
            </dt>
            <dd>{stadeEntity.ville}</dd>
            <dt>User</dt>
            <dd>{stadeEntity.user ? stadeEntity.user.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/stade" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/stade/${stadeEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ stade }: IRootState) => ({
  stadeEntity: stade.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StadeDetail);

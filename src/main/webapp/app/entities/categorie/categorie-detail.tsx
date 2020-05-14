import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './categorie.reducer';
import { ICategorie } from 'app/shared/model/categorie.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICategorieDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CategorieDetail extends React.Component<ICategorieDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { categorieEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Categorie [<b>{categorieEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="section">Section</span>
            </dt>
            <dd>{categorieEntity.section}</dd>
            <dt>
              <span id="descrition">Descrition</span>
            </dt>
            <dd>{categorieEntity.descrition}</dd>
          </dl>
          <Button tag={Link} to="/entity/categorie" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/categorie/${categorieEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ categorie }: IRootState) => ({
  categorieEntity: categorie.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategorieDetail);

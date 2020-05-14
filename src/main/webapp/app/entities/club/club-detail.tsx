import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './club.reducer';
import { IClub } from 'app/shared/model/club.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IClubDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ClubDetail extends React.Component<IClubDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { clubEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Club [<b>{clubEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="nom">Nom</span>
            </dt>
            <dd>{clubEntity.nom}</dd>
            <dt>
              <span id="adresse">Adresse</span>
            </dt>
            <dd>{clubEntity.adresse}</dd>
            <dt>
              <span id="telephone">Telephone</span>
            </dt>
            <dd>{clubEntity.telephone}</dd>
            <dt>
              <span id="logo">Logo</span>
            </dt>
            <dd>
              {clubEntity.logo ? (
                <div>
                  <a onClick={openFile(clubEntity.logoContentType, clubEntity.logo)}>Open&nbsp;</a>
                  <span>
                    {clubEntity.logoContentType}, {byteSize(clubEntity.logo)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <span id="email">Email</span>
            </dt>
            <dd>{clubEntity.email}</dd>
            <dt>User</dt>
            <dd>{clubEntity.user ? clubEntity.user.id : ''}</dd>
            <dt>Categorie</dt>
            <dd>
              {clubEntity.categories
                ? clubEntity.categories.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.section}</a>
                      {i === clubEntity.categories.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/club" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/club/${clubEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ club }: IRootState) => ({
  clubEntity: club.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClubDetail);

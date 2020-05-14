import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './categorie.reducer';
import { ICategorie } from 'app/shared/model/categorie.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICategorieProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Categorie extends React.Component<ICategorieProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { categorieList, match } = this.props;
    return (
      <div>
        <h2 id="categorie-heading">
          Categories
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Categorie
          </Link>
        </h2>
        <div className="table-responsive">
          {categorieList && categorieList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Section</th>
                  <th>Descrition</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {categorieList.map((categorie, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${categorie.id}`} color="link" size="sm">
                        {categorie.id}
                      </Button>
                    </td>
                    <td>{categorie.section}</td>
                    <td>{categorie.descrition}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${categorie.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${categorie.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${categorie.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Categories found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ categorie }: IRootState) => ({
  categorieList: categorie.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categorie);

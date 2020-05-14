import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { openFile, byteSize, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './document-plateau.reducer';
import { IDocumentPlateau } from 'app/shared/model/document-plateau.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDocumentPlateauProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class DocumentPlateau extends React.Component<IDocumentPlateauProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { documentPlateauList, match } = this.props;
    return (
      <div>
        <h2 id="document-plateau-heading">
          Document Plateaus
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Document Plateau
          </Link>
        </h2>
        <div className="table-responsive">
          {documentPlateauList && documentPlateauList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Programme</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {documentPlateauList.map((documentPlateau, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${documentPlateau.id}`} color="link" size="sm">
                        {documentPlateau.id}
                      </Button>
                    </td>
                    <td>
                      {documentPlateau.programme ? (
                        <div>
                          <a onClick={openFile(documentPlateau.programmeContentType, documentPlateau.programme)}>Open &nbsp;</a>
                          <span>
                            {documentPlateau.programmeContentType}, {byteSize(documentPlateau.programme)}
                          </span>
                        </div>
                      ) : null}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${documentPlateau.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${documentPlateau.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${documentPlateau.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Document Plateaus found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ documentPlateau }: IRootState) => ({
  documentPlateauList: documentPlateau.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentPlateau);

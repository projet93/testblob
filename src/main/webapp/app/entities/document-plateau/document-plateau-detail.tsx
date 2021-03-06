import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './document-plateau.reducer';
import { IDocumentPlateau } from 'app/shared/model/document-plateau.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDocumentPlateauDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class DocumentPlateauDetail extends React.Component<IDocumentPlateauDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { documentPlateauEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            DocumentPlateau [<b>{documentPlateauEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="programme">Programme</span>
            </dt>
            <dd>
              {documentPlateauEntity.programme ? (
                <div>
                  <a onClick={openFile(documentPlateauEntity.programmeContentType, documentPlateauEntity.programme)}>Open&nbsp;</a>
                  <span>
                    {documentPlateauEntity.programmeContentType}, {byteSize(documentPlateauEntity.programme)}
                  </span>
                </div>
              ) : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/document-plateau" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/document-plateau/${documentPlateauEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ documentPlateau }: IRootState) => ({
  documentPlateauEntity: documentPlateau.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentPlateauDetail);

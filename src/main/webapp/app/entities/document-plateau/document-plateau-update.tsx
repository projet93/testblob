import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IPlateau } from 'app/shared/model/plateau.model';
import { getEntities as getPlateaus } from 'app/entities/plateau/plateau.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './document-plateau.reducer';
import { IDocumentPlateau } from 'app/shared/model/document-plateau.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDocumentPlateauUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IDocumentPlateauUpdateState {
  isNew: boolean;
  plateauId: string;
}

export class DocumentPlateauUpdate extends React.Component<IDocumentPlateauUpdateProps, IDocumentPlateauUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      plateauId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getPlateaus();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { documentPlateauEntity } = this.props;
      const entity = {
        ...documentPlateauEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/document-plateau');
  };

  render() {
    const { documentPlateauEntity, plateaus, loading, updating } = this.props;
    const { isNew } = this.state;

    const { programme, programmeContentType } = documentPlateauEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="p93App.documentPlateau.home.createOrEditLabel">Create or edit a DocumentPlateau</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : documentPlateauEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="document-plateau-id">ID</Label>
                    <AvInput id="document-plateau-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <AvGroup>
                    <Label id="programmeLabel" for="programme">
                      Programme
                    </Label>
                    <br />
                    {programme ? (
                      <div>
                        <a onClick={openFile(programmeContentType, programme)}>Open</a>
                        <br />
                        <Row>
                          <Col md="11">
                            <span>
                              {programmeContentType}, {byteSize(programme)}
                            </span>
                          </Col>
                          <Col md="1">
                            <Button color="danger" onClick={this.clearBlob('programme')}>
                              <FontAwesomeIcon icon="times-circle" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <input id="file_programme" type="file" onChange={this.onBlobChange(false, 'programme')} />
                    <AvInput type="hidden" name="programme" value={programme} />
                  </AvGroup>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/document-plateau" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp; Save
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  plateaus: storeState.plateau.entities,
  documentPlateauEntity: storeState.documentPlateau.entity,
  loading: storeState.documentPlateau.loading,
  updating: storeState.documentPlateau.updating,
  updateSuccess: storeState.documentPlateau.updateSuccess
});

const mapDispatchToProps = {
  getPlateaus,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentPlateauUpdate);

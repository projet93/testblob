import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import GoogleMapReact from 'google-map-react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { compose, withProps } from 'recompose';
export interface IHomeProp extends StateProps, DispatchProps {}

export class Home extends React.Component<IHomeProp> {
  componentDidMount() {
    this.props.getSession();
  }

  render() {
    const MyMapComponent = compose(
      withProps({
        googleMapURL:
          'https://maps.googleapis.com/maps/api/js?key=AIzaSyDj-zgI5H5vSaR9NbLwk7BxCyPiCz3cCTs&v=3.exp&libraries=geometry,drawing,places',
        loadingElement: <div style={{ height: `75vh` }} />,
        containerElement: <div style={{ height: `100%` }} />,
        mapElement: <div style={{ height: `75vh` }} />
      }),
      withScriptjs,
      withGoogleMap
    )(props => (
      <GoogleMap defaultZoom={12} defaultCenter={{ lat: 48.93, lng: 2.4 }}>
        {props.isMarkerShown && <Marker position={{ lat: 48.93, lng: 2.4 }} />}
      </GoogleMap>
    ));
    const { account } = this.props;
    localStorage.setItem('login', account.login);
    return (
      <Row>
        <Col md="9">
          <div style={{ height: '75vh', width: '100%' }}>
            <MyMapComponent isMarkerShown />
          </div>
          {account && account.login ? (
            <div>
              <Alert color="success">
                <Translate contentKey="home.logged.message" interpolate={{ username: account.login }}>
                  You are logged in as user {account.login}.
                </Translate>
              </Alert>
            </div>
          ) : (
            <div>
              <Alert color="warning">
                If you want to
                <Link to="/login" className="alert-link">
                  {' '}
                  sign in
                </Link>
                , you can try the default accounts:
                <br />- Administrator (login=&quot;admin&quot; and password=&quot;admin&quot;)
                <br />- User (login=&quot;user&quot; and password=&quot;user&quot;).
              </Alert>
            </div>
          )}
        </Col>
        <Col md="3" className="pad">
          <span className="hipster rounded" />
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = { getSession };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

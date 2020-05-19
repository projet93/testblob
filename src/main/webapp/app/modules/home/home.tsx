import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { getSession } from 'app/shared/reducers/authentication';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import { compose, withProps } from 'recompose';
export interface IHomeProp extends StateProps, DispatchProps {}

export class Home extends React.Component<IHomeProp> {
  state = {
    stores: [
      { latitude: 48.9391, longitude: 2.48214, title: 'FC AULNAY' },
      { latitude: 48.9365, longitude: 2.4159, title: 'FC AULNAY' },
      { latitude: 48.92369, longitude: 2.42369, title: 'FC AULNAY' },
      { latitude: 48.9299, longitude: 2.306, title: 'FC AULNAY' },
      { latitude: 48.9309, longitude: 2.3996, title: 'FC AULNAY' },
      { latitude: 48.9378, longitude: 2.3896, title: 'FC AULNAY' }
    ]
  };
  componentDidMount() {
    this.props.getSession();
    this.delayedShowMarker();
  }
  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true });
    }, 3000);
  };
  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false });
    this.delayedShowMarker();
  };
  displayMarkers = () => {
    return this.state.stores.map((store, index) => {
      return (
        <Marker
          key={index}
          position={{
            lat: Number(store.latitude),
            lng: Number(store.longitude)
          }}
          onClick={() => console.log('You clicked me!')}
        >
          <InfoWindow>
            <div>
              <span>{store.title}</span>
            </div>
          </InfoWindow>
        </Marker>
      );
    });
  };
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
        {props.isMarkerShown && <Marker position={{ lat: 48.93, lng: 2.4 }} onClick={props.onMarkerClick} />}
        {this.displayMarkers()}
      </GoogleMap>
    ));

    const { account } = this.props;
    localStorage.setItem('login', account.login);
    return (
      <Row>
        <Col md="9">
          <div style={{ height: '75vh', width: '100%' }}>
            <MyMapComponent isMarkerShown onMarkerClick={this.handleMarkerClick} />
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

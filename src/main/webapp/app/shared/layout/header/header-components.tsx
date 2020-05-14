import React from 'react';

import { NavItem, NavLink, NavbarBrand } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import appConfig from 'app/config/constants';

export const BrandIcon = props => (
  <div {...props} className="brand-icon">
    <img src="content/images/logo-jhipster.png" alt="Logo" />
  </div>
);

export const Brand = props => (
  <NavbarBrand tag={Link} to="/" className="brand-logo">
    <BrandIcon />
    <span className="brand-title">District93</span>
  </NavbarBrand>
);

export const Home = props => (
  <NavItem>
    <NavLink tag={Link} to="/" className="d-flex align-items-center">
      <FontAwesomeIcon icon="home" />
      <span>Home</span>
    </NavLink>
  </NavItem>
);
export const Plateau = props => (
  <NavItem>
    <NavLink tag={Link} to="/entity/plateau" className="d-flex align-items-center jh-navlink">
      <FontAwesomeIcon icon="th-list" />
      <span>
        Plateau
      </span>
    </NavLink>
  </NavItem>
);
export const Stade = props => (
  <NavItem>
    <NavLink tag={Link} to="/entity/stade" className="d-flex align-items-center">
      <FontAwesomeIcon icon="th-list" />
      <span>
        Stade
      </span>
    </NavLink>
  </NavItem>
);

export const Referent = props => (
  <NavItem>
    <NavLink tag={Link} to="/entity/referent" className="d-flex align-items-center">
      <FontAwesomeIcon icon="th-list" />
      <span>
        Referent
      </span>
    </NavLink>
  </NavItem>
);

import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name="Entities" id="entity-menu">
    <MenuItem icon="asterisk" to="/entity/club">
      Club
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/stade">
      Stade
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/categorie">
      Categorie
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/referent">
      Referent
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/plateau">
      Plateau
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/document-plateau">
      Document Plateau
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/inscription">
      Inscription
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);

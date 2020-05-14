import React, { useState } from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink as Link } from 'react-router-dom';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';
import { Referent, Stade } from '../header/header-components';
import { relativeTimeRounding } from 'moment';



const StadeReferent = () => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  if(!isAdmin)
  return (

      <div>
    <MenuItem icon="list" to="/entity/stade">
        Stade
     </MenuItem>

     <MenuItem icon="user" to="/entity/referent">
        Referent
     </MenuItem>
     </div>
    )
    else{
      return null;
    }

};
const accountMenuItemsAuthenticated = (
  <>
    <MenuItem icon="wrench" to="/account/settings">
      Settings
    </MenuItem>
    <MenuItem icon="lock" to="/account/password">
      Password
    </MenuItem>
    <StadeReferent/>
    <MenuItem icon="sign-out-alt" to="/logout">
      Sign out
    </MenuItem>
  </>
);

const accountMenuItems = (
  <>
    <MenuItem id="login-item" icon="sign-in-alt" to="/login">
      Sign in
    </MenuItem>
  </>
);

export const AccountMenu = ({ isAuthenticated = false }) => (
  <NavDropdown icon="user" name="Account" id="account-menu">
    {isAuthenticated ? accountMenuItemsAuthenticated : accountMenuItems}
  </NavDropdown>
);

export default AccountMenu;

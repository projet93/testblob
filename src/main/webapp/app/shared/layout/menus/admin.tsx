import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

const adminMenuItems = (
  <>
    <MenuItem icon="user" to="/admin/user-management">
      User management
    </MenuItem>
    <MenuItem icon="list" to="/entity/club">
      Club
    </MenuItem>
    <MenuItem icon="tasks" to="/entity/categorie">
      Categorie
    </MenuItem>
  </>
);
export const AdminMenu = ({ showSwagger }) => (
  <NavDropdown icon="user-plus" name="Administration" style={{ width: '140%' }} id="admin-menu">
    {adminMenuItems}
    {showSwagger}
  </NavDropdown>
);

export default AdminMenu;

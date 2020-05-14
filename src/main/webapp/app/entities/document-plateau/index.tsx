import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import DocumentPlateau from './document-plateau';
import DocumentPlateauDetail from './document-plateau-detail';
import DocumentPlateauUpdate from './document-plateau-update';
import DocumentPlateauDeleteDialog from './document-plateau-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DocumentPlateauUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DocumentPlateauUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DocumentPlateauDetail} />
      <ErrorBoundaryRoute path={match.url} component={DocumentPlateau} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={DocumentPlateauDeleteDialog} />
  </>
);

export default Routes;

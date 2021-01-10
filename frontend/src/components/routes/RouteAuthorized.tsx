import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { RootState } from '../../config/store';


interface Props {
  component?: any;
  exact?: boolean;
  path?: string;
  render?: any;
}

export const RouteAuthorized: FC<Props> = ({ exact, path, component, render }) => {
  const user = useSelector((state: RootState) => state.user.details);


  if (user) {
    return <Route exact={exact} path={path} component={component} render={render} />;
  } else {
    return <Route render={() => <Redirect to="/" />} />;
  }
};
 
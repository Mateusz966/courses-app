import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';


interface Props {
  component?: any;
  exact?: boolean;
  path?: string;
  render?: () => JSX.Element;
}

export const RouteAuthorized: FC<Props> = ({
  exact,
  path,
  component,
  render,
}) => {
 //TODO SETUP USER

  if (true) {
    return (
      <Route exact={exact} path={path} component={component} render={render} />
    );
  } else {
    return <Route render={() => <Redirect to="/" />} />;
  }
};

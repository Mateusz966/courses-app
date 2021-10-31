import { observer } from 'mobx-react-lite';
import { FC, ReactElement, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useRootStore } from '../../stores/storeContext';

interface Props {
  component?: any;
  exact?: boolean;
  path?: string;
  render?: () => ReactElement;
}

export const RouteAuthorized: FC<Props> = observer(
  ({ exact, path, component, render }) => {
    const {
      userStore: {
        getUserDetails,
        user: { details },
      },
    } = useRootStore();

    useEffect(() => {
      if (!details) {
        getUserDetails();
      }
    }, []);

    return (
      <Route exact={exact} path={path} component={component} render={render} />
    );
  },
);

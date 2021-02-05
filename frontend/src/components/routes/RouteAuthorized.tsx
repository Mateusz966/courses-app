import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useRootStore } from '../../stores/storeContext';

interface Props {
  component?: any;
  exact?: boolean;
  path?: string;
  render?: () => JSX.Element;
}

export const RouteAuthorized: FC<Props> = observer(
  ({ exact, path, component, render }) => {
    const { userStore } = useRootStore();

    if (userStore?.user?.details) {
      return (
        <Route
          exact={exact}
          path={path}
          component={component}
          render={render}
        />
      );
    } else {
      return <Route render={() => <Redirect to="/" />} />;
    }
  }
);

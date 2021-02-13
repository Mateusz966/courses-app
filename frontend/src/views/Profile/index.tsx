import { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import useHeader from '../../hooks/useHeader';
import ProfileData from '../Profile/ProfileData';
import ProfileSetPassword from './ProfileSetPassword';

const Profile: FC = () => {
  useHeader('', undefined, undefined, undefined);
  return (
    <>
      <Switch>
        <Route
          exact
          path="/profile"
          render={() => <Redirect to="/profile/details" />}
        />
        <Route exact path="/profile/details" component={ProfileData} />
        <Route
          exact
          path="/profile/set-password"
          component={ProfileSetPassword}
        />
      </Switch>
    </>
  );
};

export default Profile;

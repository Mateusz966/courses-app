import { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ProfileData from '../Profile/ProfileData';
import ProfileSetPassword from './ProfileSetPassword';

const Profile: FC = () => {

  return (
    <>
      <Switch>
        <Route
          exact
          path="/dashboard/profile"
          render={() => <Redirect to="/dashboard/profile/details" />}
        />
        <Route
          exact
          path="/dashboard/profile/details"
          component={ProfileData}
        />
        <Route
          exact
          path="/dashboard/profile/set-password"
          component={ProfileSetPassword}
        />
      </Switch>
    </>
  );
};

export default Profile;

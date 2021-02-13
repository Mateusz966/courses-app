import { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { TopNavBar } from '../../components/common/TopNavbar';
import useHeader from '../../hooks/useHeader';
import Profile from '../Profile';


const Dashboard: FC = () => {
  useHeader('', undefined, undefined, undefined);
  return (
    <>
      <TopNavBar />
      <Switch>
        <Route path="/dashboard/profile" component={Profile} />
      </Switch>
    </>
  );
};

export default Dashboard;

import { FC, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import { TopNavBar } from '../../components/common/TopNavbar';

const Course = lazy(() => import('./Course'));
const Start = lazy(() => import('./Start'));
const Profile = lazy(() => import('./Profile'));

const Dashboard: FC = () => (
  <>
    <TopNavBar />
    <Switch>
      <Route exact path="/dashboard" component={Start} />
      <Route path="/dashboard/profile" component={Profile} />
      <Route path="/dashboard/course" component={Course} />
    </Switch>
  </>
);
export default Dashboard;

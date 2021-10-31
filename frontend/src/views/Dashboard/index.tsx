import { FC, lazy } from 'react';
import { Switch } from 'react-router-dom';
import { TopNavBar } from '../../components/common/TopNavbar';
import ShoppingCart from '../ShopingCart';
import { RouteAuthorized } from '../../components/routes/RouteAuthorized';

const Course = lazy(() => import('./Course'));
const Start = lazy(() => import('./Start'));
const Profile = lazy(() => import('./Profile'));

const Dashboard: FC = () => (
  <>
    <TopNavBar />
    <Switch>
      <RouteAuthorized exact path="/dashboard" component={Start} />
      <RouteAuthorized path="/dashboard/profile" component={Profile} />
      <RouteAuthorized path="/dashboard/course" component={Course} />
      <RouteAuthorized path="/dashboard/cart" component={ShoppingCart} />
    </Switch>
  </>
);
export default Dashboard;

import { FC, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import { TopNavBar } from '../../components/common/TopNavbar';
import CreatorZone from '../CreatorZone';
import ShoppingCart from '../ShopingCart';

const Course = lazy(() => import('./Course'));
const Start = lazy(() => import('./Start'));
const Profile = lazy(() => import('./Profile'));

const Dashboard: FC = () => (
  // TODO USE HEADER TO MOBX HEADER
  // useHeader('', undefined, undefined, undefined);
  <>
    <TopNavBar />
    <Switch>
      <Route exact path="/dashboard" component={Start} />
      <Route path="/dashboard/profile" component={Profile} />
      <Route path="/dashboard/creator-zone/course" component={Course} />
      <Route path="/dashboard/cart" component={ShoppingCart} />
      <Route path="/dashboard/creator-zone" component={CreatorZone} />
    </Switch>
  </>
);
export default Dashboard;

import React, { FC, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import { TopNavBar } from '../../components/common/TopNavbar';

import AddCourse from '../Course/Add';

const Course = lazy(() => import('../Course'));
const Start = lazy(() => import('../Start'));

const Dashboard: FC = () => {
  // TODO USE HEADER TO MOBX HEADER
  // useHeader('', undefined, undefined, undefined);
  return (
    <>
      <TopNavBar />
      <Switch>
        <Route exact path="/dashboard" component={Start} />
        <Route path="/dashboard/course" component={Course} />
        <Route path="/dashboard/course/add/course/add" component={AddCourse} />
      </Switch>
    </>
  );
};

export default Dashboard;

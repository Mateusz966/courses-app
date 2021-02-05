import React, { FC, lazy } from 'react';
import {  Route, Switch } from 'react-router-dom';
import { TopNavBar } from '../../components/common/TopNavbar';
import useHeader from '../../hooks/useHeader';
import AddCourse from '../Course/Add';

const Course = lazy(() => import('../Course'));
const Start = lazy(() => import('../Start'));

const Dashboard: FC = () => {
  useHeader('', undefined, undefined, undefined);
  return (
    <>
      <TopNavBar />
      <Switch>
        <Route path="/course/add" component={AddCourse} />
        <Route path="/course" component={Course} />
        <Route exact path="/" component={Start} />
      </Switch>
    </>
  );
};

export default Dashboard;

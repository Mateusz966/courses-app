import React, { FC } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import AddCourse from './Add';
import EditCourse from './Edit';

const Courses: FC = () => {
  // TODO USE HEADER TO MOBX HEADER
  return (
    <>
      <Link to="/dashboard/course/add">Stwórz kurs</Link>
      <Switch>
        <Route path="/dashboard/course/add" component={AddCourse} />
        <Route path="/dashboard/course/edit/:courseId" component={EditCourse} />
      </Switch>
    </>
  );
};

export default Courses;

import { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import AddCourse from './Add';
import EditCourse from './Edit';

const Courses: FC = () => {
  // TODO USE HEADER TO MOBX HEADER
  return (
    <>
      <Switch>
        <Route path="/dashboard/course/add" component={AddCourse} />
        <Route path="/dashboard/course/edit/:courseId" component={EditCourse} />
      </Switch>
    </>
  );
};

export default Courses;

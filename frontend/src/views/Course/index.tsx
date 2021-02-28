import { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import AddCourse from './Add';
import EditCourse from './Edit';
import EditCategories from './EditCategories';

const Courses: FC = () => {
  // TODO USE HEADER TO MOBX HEADER

  return (
    <>
      <Switch>
        <Route
          path="/dashboard/course/edit/category/details"
          component={EditCategories}
        />
        <Route path="/dashboard/course/edit/:courseId" component={EditCourse} />
        <Route path="/dashboard/course/add" component={AddCourse} />
      </Switch>
    </>
  );
};

export default Courses;

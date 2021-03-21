import { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import AddCourse from './Add';
import EditCourse from './Edit';
import EditCategories from './EditCategories';

const Courses: FC = () => {
  return (
    <>
      <Switch>
        <Route
          path="/dashboard/course/edit/details/:courseId"
          component={EditCategories}
        />
        <Route path="/dashboard/course/edit/:courseId" component={EditCourse} />
        <Route path="/dashboard/course/add" component={AddCourse} />
      </Switch>
    </>
  );
};

export default Courses;

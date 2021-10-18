import { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import AddCourse from './Add';
import CourseContent from './CourseContent';
import EditCourse from './Edit';
import EditCategories from './EditCategories';
import ManageCourses from './Manage';
import ViewCourse from './View';

const Courses: FC = () => (
  <>
    <Switch>
      <Route
        path="/dashboard/creator-zone/course/edit/content/:courseId"
        component={CourseContent}
      />
      <Route
        path="/dashboard/creator-zone/course/edit/details/:courseId"
        component={EditCategories}
      />
      <Route
        path="/dashboard/creator-zone/course/edit/:courseId"
        component={EditCourse}
      />
      <Route
        exact
        path="/dashboard/creator-zone/course/manage"
        component={ManageCourses}
      />
      <Route path="/dashboard/creator-zone/course/add" component={AddCourse} />
      <Route
        path="/dashboard/creator-zone/course/view/:courseId"
        component={ViewCourse}
      />
    </Switch>
  </>
);

export default Courses;

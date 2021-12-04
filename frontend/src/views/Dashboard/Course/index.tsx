import { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import AddCourse from './Add';
import CourseContent from './CourseContent';
import EditCourse from './Edit';
import EditCategories from './EditCategories';
import ManageCourses from './Manage';
import CoursesToBuy from './CoursesToBuy';
import ViewCourse from './View';
import CreatorZone from '../../CreatorZone';
import BoughtCoursesWraper from './Bought';
import PurchasedCourse from './PurchasedCourse';

const Courses: FC = () => (
  <>
    <Switch>
      <Route
        path="/dashboard/course/edit/content/:courseId"
        component={CourseContent}
      />
      <Route
        path="/dashboard/course/edit/details/:courseId"
        component={EditCategories}
      />
      <Route path="/dashboard/course/edit/:courseId" component={EditCourse} />
      <Route exact path="/dashboard/course/manage" component={ManageCourses} />
      <Route path="/dashboard/course/add" component={AddCourse} />
      <Route path="/dashboard/course/view/:courseId" component={ViewCourse} />
      <Route
        path="/dashboard/course/bought/view/:courseId/:lessonId?"
        component={() => <PurchasedCourse />}
      />
      <Route exact path="/dashboard/course/list" component={CoursesToBuy} />
      <Route
        exact
        path="/dashboard/course/creator-zone"
        component={CreatorZone}
      />
      <Route
        exact
        path="/dashboard/course/bought"
        component={BoughtCoursesWraper}
      />
    </Switch>
  </>
);

export default Courses;

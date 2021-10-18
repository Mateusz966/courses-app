import { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { CourseCategoryForm } from '../../../../components/forms/Course/Category';
import { CourseSubcategoryForm } from '../../../../components/forms/Course/Subcategory';
import { CourseTopicForm } from '../../../../components/forms/Course/Topics';

const EditCategories: FC = () => (
  <Switch>
    <Route path="/dashboard/creator-zone/course/edit/details/:courseId/category">
      <CourseCategoryForm />
    </Route>
    <Route path="/dashboard/creator-zone/course/edit/details/:courseId/subcategory">
      <CourseSubcategoryForm />
    </Route>
    <Route path="/dashboard/creator-zone/course/edit/details/:courseId/topics">
      <CourseTopicForm />
    </Route>
  </Switch>
);

export default EditCategories;

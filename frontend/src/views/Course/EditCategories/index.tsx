import { FC } from 'react';
import { Redirect, Route, Switch, useParams } from 'react-router-dom';
import { CourseCategoryForm } from '../../../components/forms/Course/Category';
import { CourseSubcategoryForm } from '../../../components/forms/Course/Subcategory';
import { CourseTopicForm } from '../../../components/forms/Course/Topics';

const EditCategories: FC = () => {
  const { courseId } = useParams<{ courseId: string }>();

  return (
    <Switch>
      <Route
        exact
        path="/dashboard/course/edit/category/details"
        render={() => (
          <Redirect to="/dashboard/course/edit/category/details/:courseId" />
        )}
      />
      <Route path="/dashboard/course/edit/category/details/:courseId">
        <CourseCategoryForm />
      </Route>
      <Route path="/dashboard/course/edit/subcategory/details/:courseId">
        <CourseSubcategoryForm courseId={courseId} />
      </Route>
      <Route path="/dashboard/course/edit/topics/details/:courseId">
        <CourseTopicForm courseId={courseId} />
      </Route>
    </Switch>
  );
};

export default EditCategories;

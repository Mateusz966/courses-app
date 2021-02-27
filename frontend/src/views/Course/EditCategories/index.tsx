import { FC } from 'react';
import { Route, Switch, useParams } from 'react-router-dom';
import { CourseCategoryForm } from '../../../components/forms/Course/Category';
import { CourseSubcategoryForm } from '../../../components/forms/Course/Subcategory';
import { CourseTopicForm } from '../../../components/forms/Course/Topics';

const EditCourse: FC = () => {
  const { courseId } = useParams<{ courseId: string }>();

  return (
    <Switch>
      <Route exact path="/dashboard/course/edit/category/:courseId">
        <CourseCategoryForm courseId={courseId} />
      </Route>
      <Route exact path="/dashboard/course/edit/subcategory/:courseId">
        <CourseSubcategoryForm courseId={courseId} />
      </Route>
      <Route exact path="/dashboard/course/edit/topics/:courseId">
        <CourseTopicForm courseId={courseId} />
      </Route>
    </Switch>
  );
};

export default EditCourse;

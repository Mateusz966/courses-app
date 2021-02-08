import React, { FC, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { CourseCategoryForm } from '../../../components/forms/Course/Category';
import { CourseSubcategoryForm } from '../../../components/forms/Course/Subcategory';
import { CourseTopicForm } from '../../../components/forms/Course/Topics';
import { history } from '../../../config/history';
import { useCourse } from '../../../hooks/useCourse';

const AddCourse: FC = () => {
  useEffect(() => {
  }, []);


  return (
    <Switch>
      <Route
        exact
        path="/dashboard/course/add"
        render={() => <Redirect to="/dashboard/course/add/category" />}
      />
      <Route
        exact
        path="/dashboard/course/add/category"
        component={CourseCategoryForm}
      />
      <Route
        exact
        path="/dashboard/course/add/subcategory"
        component={CourseSubcategoryForm}
      />
      <Route
        exact
        path="/dashboard/course/add/topics"
        component={CourseTopicForm}
      />
    </Switch>
  );
};

export default AddCourse;

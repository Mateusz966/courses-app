import { Box, Spinner, Switch } from '@chakra-ui/react';
import React, { FC, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useCourse } from '../../../hooks/useCourse';
import { useRootStore } from '../../../stores/storeContext';

const AddCourse: FC = () => {
  const { createCourse } = useCourse();

  useEffect(() => {
    // createCourse()
  }, []);

  return (
    <Switch>
      <Route exact path="course/add/category" />
      <Route exact path="course/add/subcategory" />
      <Route exact path="course/add/topics" />
    </Switch>
  )
};

export default AddCourse;

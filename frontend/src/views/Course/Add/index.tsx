import { Box, Spinner } from '@chakra-ui/react';
import React, { FC, useEffect } from 'react';
import { useCourse } from '../../../hooks/useCourse';
import { useRootStore } from '../../../stores/storeContext';

const AddCourse: FC = () => {
  const { createCourse } = useCourse();

  useEffect(() => {
    createCourse()
  }, []);

  return <Spinner />;
};

export default AddCourse;

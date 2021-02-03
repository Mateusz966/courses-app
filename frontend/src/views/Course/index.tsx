import React, { FC, lazy } from 'react';
import { Link, Route } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import useHeader from '../../hooks/useHeader';
import AddCourse from './Add';

const Courses: FC = () => {
  useHeader('', undefined, '', undefined, undefined, true);
  return (
    <>
      <Link to="/course/add">Stwórz kurs</Link>
    </>
  );
};

export default Courses;

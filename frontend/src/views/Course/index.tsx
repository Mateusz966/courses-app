import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';


const Courses: FC = () => {
  // TODO USE HEADER TO MOBX HEADER
  return (
    <>
      <Link to="/course/add">Stwórz kurs</Link>
    </>
  );
};

export default Courses;

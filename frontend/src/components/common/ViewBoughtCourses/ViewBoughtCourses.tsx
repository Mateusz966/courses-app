import { FC, useEffect } from 'react';
import { useApi } from '../../../hooks/useApi';

const ViewBoughtCourses: FC = () => {
  const { get } = useApi();
  //   const [course, setCourse] = useState<CourseSectionsRes[]>();

  useEffect(() => {
    const res = get<any>('/course/bought');
    console.log(res);
  }, []);

  return <p>dupa</p>;
};

export default ViewBoughtCourses;

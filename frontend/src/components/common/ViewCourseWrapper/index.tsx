import { Container, Grid, GridItem, Spinner } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ViewCourseHeader } from '../ViewCourseHeader';
import { ViewCourseBody } from '../ViewCourseBody';
import { ViewCourseSidebar } from '../ViewCourseSidebar';
import { useApi } from '../../../hooks/useApi';
import { CourseDetailsRes } from '../../../app-types';

export const ViewCourseWrapper: FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [coursePhoto, setCoursePhoto] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseContent, setCourseContent] = useState('');
  const [authorFirstName, setAuthorFirstName] = useState('');
  const [authorLastName, setAuthorLastName] = useState('');
  const [authorPhotoFn, setAuthorPhotoFn] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const { get } = useApi();

  const getCourseDetail = async () => {
    const res = await get<CourseDetailsRes>(`/course/details/${courseId}`);
    if (res) {
      setCoursePhoto(res.courseFn);
      setCourseTitle(res.title);
      setCourseDescription(res.description);
      setCourseContent(res.content);
      setAuthorFirstName(res.user.firstName);
      setAuthorLastName(res.user.lastName);
      setAuthorPhotoFn(res.user.photoFn);
      setCategory(res.category.name);
      setSubcategory(res.subcategory.name);
    }
  };

  useEffect(() => {
    getCourseDetail();
  }, []);

  if (!courseId) {
    return <Spinner />;
  }

  return (
    <Container width="100%" maxW="1500px">
      <Grid
        gridTemplateColumns={{
          sm: '3fr 1fr',
          base: '1fr',
        }}
        display={{
          md: 'grid',
          base: 'block',
        }}
        gridTemplateAreas="'mainArea sidebar'"
        gridColumnGap={{ lg: '10', md: '4' }}
        ml="auto"
        mr="auto"
      >
        <GridItem gridArea="mainArea">
          <ViewCourseHeader
            title={courseTitle}
            description={courseDescription}
            photo={coursePhoto}
            authorFirstName={authorFirstName}
            authorLastName={authorLastName}
            authorPhotoFn={authorPhotoFn}
            category={category}
            subcategory={subcategory}
          />
          <ViewCourseBody content={courseContent} />
        </GridItem>
        <GridItem gridArea="sidebar" display={{ md: 'block', base: 'none' }}>
          <ViewCourseSidebar photo={coursePhoto} />
        </GridItem>
      </Grid>
    </Container>
  );
};

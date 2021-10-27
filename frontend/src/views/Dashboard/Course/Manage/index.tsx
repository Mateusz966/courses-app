import { useEffect, useMemo, useState } from 'react';
import {
  Container,
  HStack,
  IconButton,
  Link,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
} from '@chakra-ui/react';
import { MdEdit, MdChevronRight, IoMdTrash } from 'react-icons/all';
import { Table } from '../../../../components/common/Table';
import { useApi } from '../../../../hooks/useApi';
import { getCourseStatus } from '../../../../helpers/getStatus';
import { history } from '../../../../config/history';
import { Alert } from '../../../../components/modals/Alert';
import { successNotification } from '../../../../components/common/Toast';
import {
  CourseStatus,
  CourseTableRes,
  CourseTableResContent,
} from '../../../../app-types';

const ManageCourses = () => {
  const [courses, setCourses] = useState<CourseTableResContent[]>([]);
  const { get, deleteR, inProgress } = useApi();
  const [isOpen, setIsOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string>('');

  const getCourses = async () => {
    const res = await get<CourseTableRes>('course/created/all?offset=0');
    if (res) {
      setCourses(res.items);
    }
  };

  const deleteCourse = async () => {
    const res = await deleteR('/course', idToDelete);
    if (res) {
      successNotification('Course was removed');
      // eslint-disable-next-line no-shadow
      setCourses((courses) =>
        courses.map((course) =>
          course.id === idToDelete
            ? { ...course, courseStatus: CourseStatus.Removed }
            : course,
        ),
      );
    }
    setIsOpen(false);
  };

  const onClose = () => {
    setIdToDelete('');
    setIsOpen(false);
  };

  useEffect(() => {
    getCourses();
  }, []);

  useEffect(() => {
    if (idToDelete) {
      setIsOpen(true);
    }
  }, [idToDelete]);

  const columns = useMemo(
    () => [
      {
        Header: 'Title',
        accessor: ({ id, title }: any) => (
          <Link onClick={() => history.push(`/dashboard/course/view/${id}`)}>
            {title}
          </Link>
        ),
      },
      {
        Header: 'Status',
        accessor: ({ courseStatus }: any) => getCourseStatus(courseStatus),
      },
      {
        Header: 'Actions',
        accessor: ({ id }: any) => (
          <HStack>
            <IconButton
              onClick={() =>
                history.push(`/dashboard/course/edit/${id}`, {
                  from: 'courses list',
                } as { from: string })
              }
              aria-label="Edit course"
              icon={<MdEdit />}
            />
            <IconButton
              onClick={() => setIdToDelete(id)}
              aria-label="Delete course"
              icon={<IoMdTrash />}
            />
          </HStack>
        ),
      },
    ],
    [],
  );
  return (
    <Container mt="5" width="100%" maxW="90vw">
      <Breadcrumb
        pt={{ md: '3', base: '1' }}
        spacing="8px"
        separator={<MdChevronRight color="gray.500" />}
      >
        <BreadcrumbItem>
          <BreadcrumbLink onClick={() => history.push('/dashboard')}>
            Dashboard
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>Moje kursy</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Heading
        as="h1"
        size="xl"
        fontSize={{ md: '4xl', base: 'xl' }}
        mt={{ md: '30px', base: '15px' }}
        mb="30px"
      >
        Moje kursy
      </Heading>
      <Table inProgress={inProgress} columns={columns} data={courses} />
      <Alert
        onAction={() => deleteCourse()}
        isOpen={isOpen}
        onClose={() => onClose()}
      />
    </Container>
  );
};

export default ManageCourses;

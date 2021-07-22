import { useEffect, useMemo, useState } from 'react';
import { Container, HStack, IconButton } from '@chakra-ui/react';
import { MdEdit, IoMdTrash } from 'react-icons/all';
import { Table } from '../../../../components/common/Table';
import { useApi } from '../../../../hooks/useApi';
import { getCourseStatus } from '../../../../helpers/getStatus';
import { history } from '../../../../config/history';

const ManageCourses = () => {
  const [courses, setCourses] = useState<any>([]);
  const { get, inProgress } = useApi();

  const getCourses = async () => {
    const res = await get<any>('course/created/all?offset=0&limit=10');
    if (res?.items) {
      setCourses(res.items);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Status',
        accessor: ({ status }: any) => getCourseStatus(status),
      },
      {
        Header: 'Actions',
        accessor: ({ id }: any) => (
          <HStack>
            <IconButton
              onClick={() => history.push(`/dashboard/course/edit/${id}`)}
              aria-label="Edit course"
              icon={<MdEdit />}
            />
            <IconButton
              onClick={() => history.push(`/dashboard/course/edit/${id}`)}
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
    <Container>
      <Table inProgress={inProgress} columns={columns} data={courses} />
    </Container>
  );
};

export default ManageCourses;

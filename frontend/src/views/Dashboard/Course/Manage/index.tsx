import { useEffect, useMemo, useState } from 'react';
import { Container, HStack, IconButton } from '@chakra-ui/react';
import { MdEdit, IoMdTrash } from 'react-icons/all';
import { Table } from '../../../../components/common/Table';
import { useApi } from '../../../../hooks/useApi';
import { getCourseStatus } from '../../../../helpers/getStatus';
import { history } from '../../../../config/history';
import { Alert } from '../../../../components/modals/Alert';
import { successNotification } from '../../../../components/common/Toast';

const ManageCourses = () => {
  const [courses, setCourses] = useState<any>([]);
  const { get, deleteR, inProgress } = useApi();
  const [isOpen, setIsOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string>('');

  const getCourses = async () => {
    const res = await get<any>('course/created/all?offset=0&limit=10');
    if (res?.items) {
      setCourses(res.items);
    }
  };

  const deleteCourse = async () => {
    const res = await deleteR('/course', idToDelete);
    if (res) {
      successNotification('Course was removed');
    }
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
        accessor: 'title',
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
              onClick={() => history.push(`/dashboard/course/edit/${id}`)}
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
    <Container>
      <Table inProgress={inProgress} columns={columns} data={courses} />
      <Alert
        onAction={() => deleteCourse()}
        isOpen={isOpen}
        onClose={() => onClose()}
      />
      ;
    </Container>
  );
};

export default ManageCourses;

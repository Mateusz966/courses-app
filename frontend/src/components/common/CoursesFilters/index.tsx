import { FC, useEffect, Fragment } from 'react';
import { Heading } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { useForm, FormProvider } from 'react-hook-form';
import { useCourseClient } from '../../../hooks/course/useCourseClient';
import { FormField } from '../FormField';
import { Checkbox } from '../FormField/Checkbox';
import { courseClientsStore } from '../../../stores/courseClients';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const CoursesFilters: FC = observer(() => {
  const { filters } = useCourseClient();
  const methods = useForm({ mode: 'onChange' });

  useEffect(() => {
    console.log('XD');
    courseClientsStore.getCourses();
  }, [courseClientsStore.filters]);

  if (filters) {
    return (
      <FormProvider {...methods}>
        <form>
          {Object.keys(filters).map((key) => (
            <Fragment key={key}>
              <Heading size="10">{key}</Heading>
              {filters[key].map(({ name, total, id }: any) => (
                <FormField name={name}>
                  <Checkbox
                    onChange={() =>
                      courseClientsStore.setFilter({ id, type: key as any })
                    }
                    content={`${name} (${total})`}
                  />
                </FormField>
              ))}
            </Fragment>
          ))}
        </form>
      </FormProvider>
    );
  }
  return null;
});

export default CoursesFilters;

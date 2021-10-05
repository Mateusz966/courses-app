import { FC, Fragment, useEffect } from 'react';
import { Heading } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { useForm, FormProvider } from 'react-hook-form';
import { FormField } from '../FormField';
import { Checkbox } from '../FormField/Checkbox';
import { courseClientsStore } from '../../../stores/courseClients';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const CoursesFilters: FC = observer(() => {
  const methods = useForm({ mode: 'onChange' });

  useEffect(() => {
    courseClientsStore.getFiltersList();
  }, []);

  if (courseClientsStore?.filterList) {
    return (
      <FormProvider {...methods}>
        <form>
          {Object.keys(courseClientsStore?.filterList).map((key) => (
            <Fragment key={key}>
              <Heading size="10">{key}</Heading>
              {courseClientsStore?.filterList[key].map(
                ({ name, total, id }: any) => (
                  <FormField key={id} name={name}>
                    <Checkbox
                      onChange={() =>
                        courseClientsStore.toggleFilter({
                          id,
                          type: key as any,
                        })
                      }
                      content={`${name} (${total})`}
                    />
                  </FormField>
                ),
              )}
            </Fragment>
          ))}
        </form>
      </FormProvider>
    );
  }
  return null;
});

export default CoursesFilters;

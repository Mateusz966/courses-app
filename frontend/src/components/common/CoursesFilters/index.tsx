import { FC } from 'react';
import { Heading } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { useForm, FormProvider } from 'react-hook-form';
import { useCourseClient } from '../../../hooks/course/useCourseClient';
import { FormField } from '../FormField';
import { Checkbox } from '../FormField/Checkbox';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const CoursesFilters: FC = observer(() => {
  const { filters } = useCourseClient();
  const methods = useForm({ mode: 'onChange' });

  if (filters) {
    return (
      <FormProvider {...methods}>
        <form>
          {Object.keys(filters).map((key) => (
            <>
              <Heading size="10">{key}</Heading>
              {filters[key].map(({ name, total }: any) => (
                <FormField name={name}>
                  <Checkbox content={`${name} (${total})`} />
                </FormField>
              ))}
            </>
          ))}
        </form>
      </FormProvider>
    );
  }
  return null;
});

export default CoursesFilters;

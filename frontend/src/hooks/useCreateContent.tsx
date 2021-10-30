import { SetError } from '../types/global';
import { useRootStore } from '../stores/storeContext';
import { useApi } from './useApi';
import { CourseContentReq } from '../app-types';
import { CourseContentForm } from '../interal-types';

interface Props {
  setError: SetError;
}

interface UseCreateContent {
  submit: (payload: CourseContentForm, courseId: string) => Promise<void>;
  inProgress: boolean;
}

export const useCreateContent = (props: Props): UseCreateContent => {
  const { fileStore } = useRootStore();
  const { inProgress, post } = useApi({ setError: props?.setError });

  const submit = async (
    { lesson, ...data }: CourseContentForm,
    courseId: string,
  ) => {
    const fd = new FormData();

    const mapped: CourseContentReq = {
      ...data,
      lesson: lesson.map(({ fId, ...rest }) => ({
        ...rest,
        id: fId,
      })),
    };


    fd.append('body', JSON.stringify(mapped));
    if (fileStore?.files?.[0].file) {
      fileStore.files.forEach((file, index) => {
        fd.append(file.name.split('_')[1], file.file, file.name);
      });
    }
    await post<void, FormData>(
      `/course/upload-video-lesson/to-course/${courseId}`,
      fd,
    );
  };

  return {
    submit,
    inProgress,
  };
};

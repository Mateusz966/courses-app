import { DefaultValues, FieldValues, KeepStateOptions } from 'react-hook-form';
import { SetError } from '../types/global';
import { useRootStore } from '../stores/storeContext';
import { useApi } from './useApi';
import { CourseContentReq } from '../app-types';
import { CourseContentForm } from '../interal-types';
import { successNotification } from '../components/common/Toast';

interface Props {
  setError: SetError;
  reset: (
    values?: DefaultValues<FieldValues>,
    keepStateOptions?: KeepStateOptions,
  ) => void;
}

interface UseCreateContent {
  submit: (
    payload: CourseContentForm,
    courseId: string,
    sectionId?: string,
  ) => Promise<void>;
  inProgress: boolean;
}

export const useCreateContent = (props: Props): UseCreateContent => {
  const { fileStore } = useRootStore();
  const { inProgress, post, patch } = useApi({ setError: props?.setError });

  const createSection = async (fd: FormData, courseId: string) =>
    post<any, FormData>(
      `/course/upload-video-lesson/to-course/${courseId}`,
      fd,
    );

  const updateSection = async (
    fd: FormData,
    courseId: string,
    sectionId: string,
  ) =>
    patch<any, FormData>(
      `/course/upload-video-lesson/to-course/${courseId}/section/${sectionId}`,
      fd,
    );

  const submit = async (
    { lesson, ...data }: CourseContentForm,
    courseId: string,
    sectionId?: string,
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

    let res;

    if (sectionId) {
      res = await updateSection(fd, courseId, sectionId);
    } else {
      res = await createSection(fd, courseId);
    }

    if (res) {
      props.reset();
      successNotification('Sukces');
    }
  };

  return {
    submit,
    inProgress,
  };
};

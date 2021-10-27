import { SetError } from '../types/global';
import { useRootStore } from '../stores/storeContext';
import { useApi } from './useApi';
import { CourseContentReq } from '../app-types/course';

interface Props {
  setError: SetError;
}

interface UseCreateContent {
  submit: (payload: CourseContentReq, courseId: string) => Promise<void>;
  inProgress: boolean;
}

export const useCreateContent = (props: Props): UseCreateContent => {
  const { fileStore } = useRootStore();
  const { inProgress, post } = useApi({ setError: props?.setError });

  const submit = async (payload: CourseContentReq, courseId: string) => {
    const fd = new FormData();

    console.log(payload);

    fd.append('body', JSON.stringify(payload));
    if (fileStore?.files?.[0].file) {
      fileStore.files.forEach((file, index) => {
        fd.append(file.name, file.file, file.name);
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

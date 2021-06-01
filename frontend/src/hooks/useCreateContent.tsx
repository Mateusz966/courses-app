import { SetError } from '../types/global';
import { useRootStore } from '../stores/storeContext';
import { useApi } from './useApi';

interface Props {
  setError: SetError;
}

interface UseCreateContent {
  submit: (payload: any, courseId: string) => Promise<void>;
  inProgress: boolean;
}

export const useCreateContent = (props: Props): UseCreateContent => {
  const { fileStore } = useRootStore();
  const { inProgress, post } = useApi({ setError: props?.setError });

  const submit = async (payload: any, courseId: string) => {
    const { id } = payload;
    const fd = new FormData();

    fd.append('body', JSON.stringify(payload));
    if (fileStore?.files?.[0].file) {
      fileStore.files.forEach((file, index) => {
        fd.append(`video_${payload.lesson[index].id}`, file.file, file.name);
      });
    }

    console.log(payload)
    console.log(fd)

    await post<any, any>(
      `/course/upload-video-lesson/to-course/${courseId}`,
      fd
    );
  };

  return {
    submit,
    inProgress,
  };
};

import { useRootStore } from '../stores/storeContext';

interface UseFile {
  addFile: (file: Blob | File, name: string) => void;
  removeFile: (name: string) => void;
}

export const useFile = (): UseFile => {
  const { fileStore } = useRootStore();

  const addFile = (file: Blob, name: string) => {
    fileStore.setFile({ file, name });
  };

  const removeFile = (name: string) => {
    fileStore.removeFile(name);
  };

  return {
    addFile,
    removeFile,
  };
};

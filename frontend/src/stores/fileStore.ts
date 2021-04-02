import { action, makeObservable, observable } from 'mobx';
import { RootStore } from '.';


interface MultimediaFile {
  file: File | Blob
  name: string
}

export class FileStore {
  root: RootStore;
  files: MultimediaFile[] | null;

  constructor(root: RootStore) {
    this.root = root;
    this.files = null;
    makeObservable(this, {
      files: observable,
      setFile: action,
      removeFile: action,
      removeAllFiles: action
    });
  }

  setFile(file: MultimediaFile) {
    if (this.files) {
      this.files.push(file)
    } else {
      this.files = [file];
    }
  }

  removeFile(name: string) {
    if (this.files) {
      this.files.filter((file: any) => file.name !== name);
    }

    if (this.files?.length === 0) {
      this.files = null;
    }
  }

  removeAllFiles() {
    this.files = null;
  }

}

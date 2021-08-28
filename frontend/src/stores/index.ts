import { FileStore } from './fileStore';
import { HeaderStore } from './header';
import { UserStore } from './user';

export class RootStore {
  userStore: UserStore;

  headerStore: HeaderStore;

  fileStore: FileStore;

  constructor() {
    this.userStore = new UserStore(this);
    this.headerStore = new HeaderStore(this);
    this.fileStore = new FileStore(this);
  }
}

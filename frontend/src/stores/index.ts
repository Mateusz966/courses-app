import { HeaderStore } from './header';
import { UserStore } from './user';

export class RootStore {
  userStore: UserStore;
  headerStore: HeaderStore;

  constructor() {
    this.userStore = new UserStore(this);
    this.headerStore = new HeaderStore(this);
  }
}

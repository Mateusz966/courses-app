import { action, makeObservable, observable } from 'mobx';
import { RootStore } from '.';
import { UserDefault } from '../app-types/user';

interface User {
  details: UserDefault | null;
}

export class UserStore {
  root: RootStore;
  user: User = {
    details: null,
  };

  constructor(root: RootStore) {
    this.root = root;
    makeObservable(this, {
      user: observable,
      setUser: action,
    });
  }

  setUser(user: UserDefault) {
    this.user.details = user;
  }

  getUserDetails() {}
}

import { action, makeObservable, observable } from 'mobx';
import { UserRes } from '../../../app-types/user';
import { UserDefault, UserEntity } from '../app-types/user';

interface User {
  details: UserDefault | null;
}

export class UserStore {
  user: User = {
    details: null,
  };

  constructor() {
    makeObservable(this, {
      user: observable,
      setUser: action,
    });
  }

  setUser(user: UserDefault) {
    this.user.details = user;
  }
}

import { createStandaloneToast } from '@chakra-ui/react';
import { action, makeObservable, observable, runInAction } from 'mobx';
import { RootStore } from '.';
import { UserDefault } from '../app-types/user';
import api from '../service/api';

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
      getUserDetails: action.bound,
    });
  }

  setUser(user: UserDefault) {
    this.user.details = user;
  }

  async getUserDetails() {
    try {
      const user = await api.get<UserDefault>('auth/user');
      if (user) {
        runInAction(() => {
          this.user.details = user;
        })
      }
    } catch (error) {
      const toast = createStandaloneToast()
      runInAction(() => {
        toast({
          title: "An error occurred.",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: 'top-right'
        })
      })
      throw error;
    }
  }
}

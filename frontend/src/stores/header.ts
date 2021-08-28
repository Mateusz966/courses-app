import { action, makeObservable, observable } from 'mobx';
import { RootStore } from '.';

interface Header {
  title: string;
  subtitle?: string;
  noLeft?: boolean;
  hide?: boolean;
}

export class HeaderStore {
  root: RootStore;

  header: Header = {
    title: '',
  };

  constructor(root: RootStore) {
    this.root = root;
    makeObservable(this, {
      header: observable,
      setHeader: action,
    });
  }

  setHeader(payload: Header) {
    this.header = payload;
  }
}

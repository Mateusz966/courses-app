import { FileStore } from './fileStore';
import { HeaderStore } from './header';
import { UserStore } from './user';
import { ShoppingCartStore } from './shoppingCart';

export class RootStore {
  userStore: UserStore;

  headerStore: HeaderStore;

  fileStore: FileStore;

  shoppingCart: ShoppingCartStore;

  constructor() {
    this.userStore = new UserStore(this);
    this.headerStore = new HeaderStore(this);
    this.fileStore = new FileStore(this);
    this.shoppingCart = new ShoppingCartStore(this);
  }
}

import { FileStore } from './fileStore';
import { HeaderStore } from './header';
import { UserStore } from './user';
import { ShopingCartStore } from './shopingCart';

export class RootStore {
  userStore: UserStore;

  headerStore: HeaderStore;

  fileStore: FileStore;

  shopingCart: ShopingCartStore;

  constructor() {
    this.userStore = new UserStore(this);
    this.headerStore = new HeaderStore(this);
    this.fileStore = new FileStore(this);
    this.shopingCart = new ShopingCartStore(this);
  }
}

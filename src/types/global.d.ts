interface Menu {
  title: string;
  description: string;
  prices: MenuPrices;
  products: MenuProducts;
}

interface MenuPrices {
  week: {
    Marmitex: number,
    Marmitinha: number,
  };
  weekend: {
    Marmitex: number,
    Marmitinha: number,
  };
}

interface MenuProducts {
  [key: string]: Category;
}

interface Category {
  title: string;
  description: string;
  products: {
    [key: string]: Portions;
  };
}

interface Portions {
  title: string;
  description: string;
  products: {
    [key: string]: Portion;
  };
}

interface Portion {
  available: boolean;
  category: string;
  type: string;
  id: string;
  name: string;
  description: string;
  image: string;
}

interface BgProps {
  bgImage: string;
}

interface StatusSubmit {
  label: string;
  status: 'error' | 'sucess' | null;
  msg: string | null;
}

interface PropsHeader {
  marmitaCount: number;
  bag: number;
}

interface MarmitaPortions {
  [key: string]: string[];
}

interface Marmita {
  portions?: MarmitaPortions;
}

interface MarmitaOnBag {
  id: string;
  size: 'Marmitinha'|'Marmitex';
  portions: MarmitaPortions;
}

interface Bag {
  [key: string]: MarmitaOnBag;
}

interface OrderBagDB {
  [key: string]: MarmitaOnOrderBagDB;
}

interface MarmitaOnOrderBagDB {
  id: string;
  size: 'Marmitinha'|'Marmitex';
  portions: MarmitaPortions;
  price: number;
}

interface ObjectKeyString {
  [key: string]: string | number;
}

interface OptionsObject {
  [key: string]: number | string | null;
}

type FormDataEntries = [string, string][];

interface OrderChoices {
  payment: string;
  installment?: string;
  delivery?: string;
}

interface OrderFormData {
  uid: string;
  client: string;
  contact: string;
  payment: string;
  installment: string|null;
  delivery: string|null;
  address: string;
}

interface UserDB {
  uid: string;
  userData: UserData;
  userOrders: UserOrders;
}

interface UserData {
  displayName: string;
  email: string;
  photoURL: string;
  createdAt?: number;
  lastLoginAt?: number;
  phoneNumber?: string;
  street?: string;
  streetNumber?: string;
  neighborhood?: string;
  reference?: string;
  admin?: boolean;
}

interface UserOrders {
  [key:string]: UserOrder;
}

interface UserOrder {
  uuid: string;
  orderFormData: OrderFormData;
  orderMarmitas: OrderBagDB;
  orderTime: number;
  totalPrice: number;
  status: OrderStatus;
}

type OrderStatus = 'pendente' | 'preparo' | 'entrega' | 'concluido' | 'cancelado';

interface UsersDB {
  [key:string]: UserDB;
}

interface ObjectArrayString {
  [key:string]: string[];
}
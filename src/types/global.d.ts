interface Menu {
  title: string;
  description1?: string;
  description2?: string;
  products: MenuProducts;
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
  category: string;
  type: string;
  id: string;
  name: string;
  description: string;
  image: string[];
}

interface BgProps {
  bgImage: string;
}

interface StatusSubmit {
  label: string;
  status: string | null;
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
  size: string;
  portions: MarmitaPortions;
  price: number;
}

interface Bag {
  [key: string]: MarmitaOnBag;
}

interface OptionsObject {
  [key: string]: number | null;
}
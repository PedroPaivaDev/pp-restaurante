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

interface Marmita {
  [key: string]: string[];
}

interface Bag {
  [key: string]: Marmita;
}
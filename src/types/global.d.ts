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
  status: string;
  msg: string;
}
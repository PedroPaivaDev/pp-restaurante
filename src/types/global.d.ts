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

interface GridTest {
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
}
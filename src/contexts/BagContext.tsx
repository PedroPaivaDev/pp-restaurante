import React from 'react';

interface PropsBagContext {
  bagCount: number;
  setBagCount: React.Dispatch<React.SetStateAction<number>>;
}

const defaultContext = {
  bagCount: 0,
  setBagCount: () => []
}

export const BagContext = React.createContext<PropsBagContext>(defaultContext);

export const BagProvider = ({children}:{children:React.ReactNode;}) => {
  const [bagCount, setBagCount] = React.useState<number>();
  return (
    <BagContext.Provider value={{
      bagCount:bagCount as number,
      setBagCount: setBagCount as React.Dispatch<React.SetStateAction<number>>
    }}>
      {children}
    </BagContext.Provider>
  )
};
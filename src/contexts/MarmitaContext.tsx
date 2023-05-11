import React from 'react';

interface PropsMarmitaContext {
  marmitaCount: string[];
  setMarmitaCount: React.Dispatch<React.SetStateAction<string[]>>;
}

const defaultContext = {
  marmitaCount: [],
  setMarmitaCount: () => []
}

export const MarmitaContext = React.createContext<PropsMarmitaContext>(defaultContext);

const MarmitaProvider = ({children}:{children:React.ReactNode;}) => {
  const [marmitaCount, setMarmitaCount] = React.useState<string[]>();
  return (
    <MarmitaContext.Provider value={{
      marmitaCount:marmitaCount as string[],
      setMarmitaCount: setMarmitaCount as React.Dispatch<React.SetStateAction<string[]>>
    }}>
      {children}
    </MarmitaContext.Provider>
  )
};

export default MarmitaProvider;
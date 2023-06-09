import React from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';

type PropsMarmitaSetState = React.Dispatch<React.SetStateAction<Marmita>>;
type PropsBagSetState = React.Dispatch<React.SetStateAction<Bag>>;

interface PropsMarmitaContext {
  marmitaStorage: Marmita;
  setMarmitaStorage: PropsMarmitaSetState;
  bagStorage: Bag;
  setBagStorage: PropsBagSetState;
}

const defaultContext = {
  marmitaStorage: {},
  setMarmitaStorage: () => ({}),
  bagStorage: {},
  setBagStorage: () => ({})
}

export const MarmitaContext = React.createContext<PropsMarmitaContext>(defaultContext);

const MarmitaProvider = ({children}:{children:React.ReactNode;}) => {  
  const [marmitaStorage, setMarmitaStorage] = useLocalStorage<Marmita>('marmita', {});
  const [bagStorage, setBagStorage] = useLocalStorage<Bag>('bag', {});
  return (
    <MarmitaContext.Provider value={{
      marmitaStorage: marmitaStorage,
      setMarmitaStorage: setMarmitaStorage,
      bagStorage: bagStorage,
      setBagStorage: setBagStorage
    }}>
      {children}
    </MarmitaContext.Provider>
  )
};

export default MarmitaProvider;
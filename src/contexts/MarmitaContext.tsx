import useLocalStorage from '@/hooks/useLocalStorage';
import React from 'react';

interface PropsMarmitaContext {
  marmitaStorage: Marmita;
  setMarmitaStorage: React.Dispatch<React.SetStateAction<Marmita>>;
  bagStorage: Marmita;
  setBagStorage: React.Dispatch<React.SetStateAction<Marmita>>;

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
  const [bagStorage, setBagStorage] = useLocalStorage<Marmita>('bag', {});
  return (
    <MarmitaContext.Provider value={{
      marmitaStorage: marmitaStorage as Marmita,
      setMarmitaStorage: setMarmitaStorage as React.Dispatch<React.SetStateAction<Marmita>>,
      bagStorage: bagStorage as Marmita,
      setBagStorage: setBagStorage as React.Dispatch<React.SetStateAction<Marmita>>
    }}>
      {children}
    </MarmitaContext.Provider>
  )
};

export default MarmitaProvider;
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
  setMarmitaStorage: () => null,
  bagStorage: {},
  setBagStorage: () => null
}

export const MarmitaContext = React.createContext<PropsMarmitaContext>(defaultContext);

const MarmitaProvider = ({children}:{children:React.ReactNode;}) => {  
  const [marmitaStorage, setMarmitaStorage] = useLocalStorage<Marmita|string>('marmita', '');
  const [bagStorage, setBagStorage] = useLocalStorage<Marmita|string>('bag', '');
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
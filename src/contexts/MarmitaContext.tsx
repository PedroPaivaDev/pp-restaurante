import useLocalStorage from '@/hooks/useLocalStorage';
import React from 'react';

type PropsSetState = React.Dispatch<React.SetStateAction<Marmita>>;

interface PropsMarmitaContext {
  marmitaStorage: Marmita;
  setMarmitaStorage: PropsSetState;
  bagStorage: Marmita;
  setBagStorage: PropsSetState;
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
      setMarmitaStorage: setMarmitaStorage as PropsSetState,
      bagStorage: bagStorage as Marmita,
      setBagStorage: setBagStorage as PropsSetState
    }}>
      {children}
    </MarmitaContext.Provider>
  )
};

export default MarmitaProvider;
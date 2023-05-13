import useLocalStorage from '@/hooks/useLocalStorage';
import React from 'react';

type PropsSetState = React.Dispatch<React.SetStateAction<ObjectWithStringArrays>>;

interface PropsMarmitaContext {
  marmitaStorage: ObjectWithStringArrays;
  setMarmitaStorage: PropsSetState;
  bagStorage: ObjectWithStringArrays;
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
  const [marmitaStorage, setMarmitaStorage] = useLocalStorage<ObjectWithStringArrays>('marmita', {});
  const [bagStorage, setBagStorage] = useLocalStorage<ObjectWithStringArrays>('bag', {});
  return (
    <MarmitaContext.Provider value={{
      marmitaStorage: marmitaStorage as ObjectWithStringArrays,
      setMarmitaStorage: setMarmitaStorage as PropsSetState,
      bagStorage: bagStorage as ObjectWithStringArrays,
      setBagStorage: setBagStorage as PropsSetState
    }}>
      {children}
    </MarmitaContext.Provider>
  )
};

export default MarmitaProvider;
import { createContext, useContext, FC, useEffect, useState, ReactNode } from 'react';
import Realm from 'realm';
import { getRealm } from '../databases/realm';

export const RealmContext = createContext<Realm | undefined>(undefined)

const RealmContextProvider = ({ children }) => {
  const [realm, setRealm] = useState<Realm|undefined>(undefined)

  useEffect(() => {
    (async () => {
      setRealm(await getRealm());
    })();
  }, [])

  return(
    <RealmContext.Provider value={realm}>{children}</RealmContext.Provider>
  )
}

export const useMainContext = () => useContext(RealmContext);

export default RealmContextProvider;

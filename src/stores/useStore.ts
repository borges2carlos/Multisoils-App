import create from 'zustand';
import { persist, StateStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import auth, { AuthProps } from './auth';

export type MyState = AuthProps;

const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return AsyncStorage.getItem(name);
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await AsyncStorage.setItem(name, value);
  },
  removeItem: () => {},
};

const useStore = create<MyState>()(
  persist(
    (set, get) => ({
      ...auth(set),
    }),
    { name: '@MultiSoilsZ', getStorage: () => storage },
  ),
);

export default useStore;

import { atom, createStore, useAtom, useAtomValue } from 'jotai';

export interface userSessionInterface {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string | null;
}

const store = createStore();

export const userSessionAtom = atom<userSessionInterface | null>({ name: '', email: '', image: '', role: '' });

export const useUserSessionAtom = () => {
  const [userSession, setUserSession] = useAtom(userSessionAtom, { store });
  return { userSession, setUserSession };
};

export const useUserSessionValue = () => {
  return useAtomValue(userSessionAtom, { store });
};

export const useIsUserLoggedIn = () => {
  const userSession = useAtomValue(userSessionAtom, { store });

  if (userSession?.name) {
    return true;
  }
  return false;
};

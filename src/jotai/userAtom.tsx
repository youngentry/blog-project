import { atom, createStore, useAtom } from 'jotai';

export interface userSessionInterface {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string | null;
}

const store = createStore();

export const userSessionAtom = atom<userSessionInterface | null>({ name: '', email: '', image: '', role: '' });

export function useUserSessionAtom() {
  const [userSession, setUserSession] = useAtom(userSessionAtom, { store });

  return { userSession, setUserSession };
}

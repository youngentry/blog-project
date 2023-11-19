import React, { ReactNode } from 'react';
import { Provider, atom, createStore, useAtom } from 'jotai';

const store = createStore();
const isModalVisibleAtom = atom<boolean>(false);

export const SearchPostProvider = ({ children }: { children: ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export const useIsModalVisibleAtom = () => {
  return useAtom(isModalVisibleAtom, { store });
};

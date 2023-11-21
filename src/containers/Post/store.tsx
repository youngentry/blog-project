import React, { ReactNode } from 'react';
import { Provider, atom, createStore, useAtom, useAtomValue, useSetAtom } from 'jotai';

import { getPostItemData } from '@/services/postsFetch';

const store = createStore();
const postIdAtom = atom(0);
export const postDataAtom = atom(async (get) => {
  const id = get(postIdAtom);
  const data = await getPostItemData(String(id));
  return data;
});

export const PostItemProvider = ({ children }: { children: ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export const usePostData = () => {
  const [postData] = useAtom(postDataAtom, { store });
  return postData;
};

export const useIsExistPostData = () => {
  return useAtomValue(postDataAtom);
};

export const useSetPostIdAtom = (postId: number) => {
  const [, useSetPostId] = useAtom(postIdAtom, { store });
  useSetPostId(postId);
};

export const useGetPostId = () => {
  return useAtomValue(postIdAtom, { store });
};

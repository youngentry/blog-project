'use client';

import { Provider } from 'jotai';

import SearchModal from '@/containers/NavHead/components/SearchModal/SearchModal';

import OpenSearchModalButton from '../OpenSearchModalButton/OpenSearchModalButton';

const SearchPost = () => {
  return (
    <Provider>
      <SearchModal />
      <OpenSearchModalButton />
    </Provider>
  );
};

export default SearchPost;

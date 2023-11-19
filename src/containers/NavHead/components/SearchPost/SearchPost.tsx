'use client';

import SearchModal from '@/containers/NavHead/components/SearchModal/SearchModal';

import OpenSearchModalButton from '../OpenSearchModalButton/OpenSearchModalButton';
import { SearchPostProvider } from '../../store';

const SearchPost = () => {
  return (
    <SearchPostProvider>
      <SearchModal />
      <OpenSearchModalButton />
    </SearchPostProvider>
  );
};

export default SearchPost;

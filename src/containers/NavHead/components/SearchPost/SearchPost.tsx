'use client';

import { useState } from 'react';

import SearchModal from '@/containers/NavHead/components/SearchModal/SearchModal';

import OpenSearchModalButton from '../OpenSearchModalButton/OpenSearchModalButton';

const SearchPost = () => {
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);

  const modalProps = {
    isVisibleModal,
    setIsVisibleModal,
  };

  return (
    <>
      <SearchModal {...modalProps} />
      <OpenSearchModalButton {...modalProps} />
    </>
  );
};

export default SearchPost;

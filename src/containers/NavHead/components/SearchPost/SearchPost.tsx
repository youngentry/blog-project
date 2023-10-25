'use client';

import { useState } from 'react';

import SearchModal from '@/containers/NavHead/components/SearchModal/SearchModal';

import SearchPostButton from '../SearchPostButton/SearchPostButton';

const SearchPost = () => {
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);

  const modalProps = {
    isVisibleModal,
    setIsVisibleModal,
  };

  return (
    <>
      <SearchModal {...modalProps} />
      <SearchPostButton {...modalProps} />
    </>
  );
};

export default SearchPost;

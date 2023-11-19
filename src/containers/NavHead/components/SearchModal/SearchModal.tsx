'use client';

import { BsSearch, BsX } from 'react-icons/bs';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import useClickOutside from '@/hooks/useClickOutside';
import useCategoryList, { UseCategoryInterface } from '@/hooks/useCategoryList';
import { CommonCategoryInterface } from '@/types/types';
import { POST_LENGTH } from '@/constants/LENGTH';

import styles from './SearchModal.module.scss';
import CustomInput from '../../../../components/inputs/CustomInput/CustomInput';
import SearchCategoryBox from '../SearchCategoryBox/SearchCategoryBox';
import { useIsModalVisibleAtom } from '../../store';

type ModalVisibleControlType = () => void;

const SearchModal = () => {
  const REQUEST_SEARCH_INPUT = '검색어를 입력해주세요.';
  const CATEGORY_TITLE_QUERY_URL = '/category?title=';

  const router = useRouter();

  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { categoryList }: UseCategoryInterface = useCategoryList();

  const [isModalVisible, setIsModalVisible] = useIsModalVisibleAtom();

  const closeSearchModal: ModalVisibleControlType = () => setIsModalVisible(false);

  const [searchInput, setSearchInput] = useState<string>('');

  // 모달 창 visible 이벤트
  useEffect(() => {
    setSearchInput('');
    inputRef?.current?.focus();
  }, [isModalVisible]);

  // 모달 바깥 클릭 시 모달 창 닫기
  useClickOutside(modalRef, closeSearchModal);

  // 검색 결과 페이지로 이동
  const navigateToSearchResults = () => {
    if (!searchInput) {
      window.alert(REQUEST_SEARCH_INPUT);
      return;
    }

    router.push(`${CATEGORY_TITLE_QUERY_URL}${searchInput}`);
    closeSearchModal();
  };

  // 엔터 누르면 실행되는 이벤트
  const handleOnKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      navigateToSearchResults();
    }
  };

  const subTitleList: CommonCategoryInterface[] = categoryList.map((category) => category.children || []).flat();

  return (
    <div className={`${styles.container} ${isModalVisible && 'visible'}`}>
      <div className={styles.searchBox} ref={modalRef}>
        <button className={styles.closeModalButton} type='button' onClick={closeSearchModal}>
          <BsX />
        </button>
        <div className={styles.searchBar}>
          <i className={styles.searchIcon}>
            <BsSearch />
          </i>
          <CustomInput
            inputRef={inputRef}
            className={styles.searchInput}
            value={searchInput}
            dispatch={setSearchInput}
            placeholder={REQUEST_SEARCH_INPUT}
            maxLength={POST_LENGTH.MAX_TITLE}
            onKeyDown={handleOnKeyDown}
            injectionProtected
          />
        </div>
        <SearchCategoryBox subTitleList={subTitleList} closeSearchModal={closeSearchModal} />
      </div>
    </div>
  );
};

export default SearchModal;

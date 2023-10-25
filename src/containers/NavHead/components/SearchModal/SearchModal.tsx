'use client';

import { BsSearch, BsX } from 'react-icons/bs';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import useClickOutside from '@/hooks/useClickOutside';
import useCategoryList, { UseCategoryInterface } from '@/hooks/useCategoryList';
import { CommonCategoryInterface } from '@/types/types';
import { POST_LENGTH } from '@/constants/LENGTH';

import styles from './SearchModal.module.scss';
import CustomInput from '../../../../components/inputs/CustomInput/CustomInput';
import SearchCategoryBox from '../SearchCategoryBox/SearchCategoryBox';

interface PropsInterface {
  isVisibleModal: boolean;
  setIsVisibleModal: Dispatch<SetStateAction<boolean>>;
}

const SearchModal = (props: PropsInterface) => {
  const { isVisibleModal, setIsVisibleModal } = props;

  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { categoryList }: UseCategoryInterface = useCategoryList();

  const [searchInput, setSearchInput] = useState<string>('');

  // 모달 창 visible 이벤트
  useEffect(() => {
    setSearchInput(''); // input 초기화
    inputRef?.current?.focus(); // input에 focus
  }, [isVisibleModal]);

  // 모달 바깥 클릭 시 모달 창 닫기
  useClickOutside(modalRef, false, setIsVisibleModal);

  // 검색 결과 페이지로 이동
  const GoToSearchResult = () => {
    if (!searchInput) {
      window.alert('검색어를 입력해주세요.');
      return;
    }

    router.push(`/category?title=${searchInput}`);
    setIsVisibleModal(false);
  };

  // 엔터 누르면 실행되는 이벤트
  const handleOnKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      GoToSearchResult();
    }
  };

  const subTitleList: CommonCategoryInterface[] = categoryList.map((category) => category.children || []).flat();

  return (
    <div className={`${styles.container} ${isVisibleModal && 'visible'}`}>
      <div className={styles.searchBox} ref={modalRef}>
        <button className={styles.closeModalButton} type='button' onClick={() => setIsVisibleModal(false)}>
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
            placeholder='검색어를 입력해주세요.'
            maxLength={POST_LENGTH.MAX_TITLE}
            onKeyDown={handleOnKeyDown}
          />
        </div>
        <SearchCategoryBox subTitleList={subTitleList} setIsVisibleModal={setIsVisibleModal} />
      </div>
    </div>
  );
};

export default SearchModal;

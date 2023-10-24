import { Dispatch, SetStateAction } from 'react';
import { BsSearch } from 'react-icons/bs';

import styles from './SearchPostButton.module.scss';

interface PropsInterface {
  isVisibleModal: boolean;
  setIsVisibleModal: Dispatch<SetStateAction<boolean>>;
}

const SearchPostButton = (props: PropsInterface) => {
  const { isVisibleModal, setIsVisibleModal } = props;

  return (
    <button className={styles.searchPostButton} onClick={() => setIsVisibleModal(!isVisibleModal)} type='button'>
      <BsSearch />
    </button>
  );
};

export default SearchPostButton;

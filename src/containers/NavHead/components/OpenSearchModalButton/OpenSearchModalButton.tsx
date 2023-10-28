import { Dispatch, SetStateAction } from 'react';
import { BsSearch } from 'react-icons/bs';

import styles from './OpenSearchModalButton.module.scss';

interface PropsInterface {
  isVisibleModal: boolean;
  setIsVisibleModal: Dispatch<SetStateAction<boolean>>;
}

const OpenSearchModalButton = (props: PropsInterface) => {
  const { isVisibleModal, setIsVisibleModal } = props;

  return (
    <button className={styles.openSearchModalButton} onClick={() => setIsVisibleModal(!isVisibleModal)} type='button'>
      <BsSearch />
    </button>
  );
};

export default OpenSearchModalButton;

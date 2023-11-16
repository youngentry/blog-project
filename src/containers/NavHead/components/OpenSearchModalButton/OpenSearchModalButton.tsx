import { BsSearch } from 'react-icons/bs';
import { useSetAtom } from 'jotai';

import styles from './OpenSearchModalButton.module.scss';
import { isModalVisibleAtom } from '../../atoms';

type ModalVisibleControlType = () => void;

const OpenSearchModalButton = () => {
  const setIsModalVisible = useSetAtom(isModalVisibleAtom);

  const openSearchModal: ModalVisibleControlType = () => setIsModalVisible(true);

  return (
    <button className={styles.openSearchModalButton} onClick={openSearchModal} type='button'>
      <BsSearch />
    </button>
  );
};

export default OpenSearchModalButton;

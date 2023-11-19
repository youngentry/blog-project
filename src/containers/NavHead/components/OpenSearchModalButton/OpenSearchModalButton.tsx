import { BsSearch } from 'react-icons/bs';

import styles from './OpenSearchModalButton.module.scss';
import { useIsModalVisibleAtom } from '../../store';

type ModalVisibleControlType = () => void;

const OpenSearchModalButton = () => {
  const [, setIsModalVisible] = useIsModalVisibleAtom();

  const openSearchModal: ModalVisibleControlType = () => setIsModalVisible(true);

  return (
    <button className={styles.openSearchModalButton} onClick={openSearchModal} type='button'>
      <BsSearch />
    </button>
  );
};

export default OpenSearchModalButton;

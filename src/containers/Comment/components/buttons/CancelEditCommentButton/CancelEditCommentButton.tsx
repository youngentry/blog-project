import styles from './CancelEditCommentButton.module.scss';

interface PropsInterface {
  initCommentEdit: () => void;
}

const CancelEditCommentButton = (props: PropsInterface) => {
  const { initCommentEdit } = props;
  return (
    <button className={styles.editCancelButton} onClick={() => initCommentEdit()} type='button'>
      취소
    </button>
  );
};

export default CancelEditCommentButton;

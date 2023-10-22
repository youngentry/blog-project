import styles from './CancelEditCommentButton.module.scss';

export interface CancelEditCommentButtonPropsInterface {
  initCommentEdit: () => void;
}

const CancelEditCommentButton = (props: CancelEditCommentButtonPropsInterface) => {
  const { initCommentEdit } = props;
  return (
    <button className={styles.editCancelButton} onClick={() => initCommentEdit()} type='button'>
      취소
    </button>
  );
};

export default CancelEditCommentButton;

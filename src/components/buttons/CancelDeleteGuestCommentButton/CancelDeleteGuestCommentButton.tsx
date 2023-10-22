import styles from './CancelDeleteGuestCommentButton.module.scss';

export interface CancelDeleteGuestCommentButtonPropsInterface {
  initCheckingDeleteGuestComment: () => void;
}

const CancelDeleteGuestCommentButton = (props: CancelDeleteGuestCommentButtonPropsInterface) => {
  const { initCheckingDeleteGuestComment } = props;
  return (
    <button className={styles.deleteCancelButton} onClick={() => initCheckingDeleteGuestComment()} type='button'>
      취소
    </button>
  );
};

export default CancelDeleteGuestCommentButton;

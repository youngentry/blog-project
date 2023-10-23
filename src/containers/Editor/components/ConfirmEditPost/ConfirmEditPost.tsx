import { memo } from 'react';

import ConfirmEditPostButton, {
  ConfirmEditPostButtonPropsInterface,
} from '@/containers/Editor/components/ConfirmEditPostButton/ConfirmEditPostButton';

import styles from './ConfirmEditPost.module.scss';

// 게시물 수정 확인 버튼입니다.
const ConfirmEditPost = (props: ConfirmEditPostButtonPropsInterface) => {
  const { title, subtitle: selectedSubtitle, contents, mainCategoryId, postId } = props;

  // 수정하기 버튼 클릭 이벤트

  const confirmEditPostButtonProps = {
    title,
    subtitle: selectedSubtitle,
    contents,
    mainCategoryId,
    postId,
  };

  return (
    <div className={styles.container}>
      <ConfirmEditPostButton {...confirmEditPostButtonProps} />
    </div>
  );
};

export default memo(ConfirmEditPost);

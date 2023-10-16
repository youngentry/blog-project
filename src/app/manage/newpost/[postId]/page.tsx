import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

import Editor from '@/containers/Editor/PostEditor';
import { checkEditAuthor } from '@/utils/sessionCheck/checkEditAuthor';

// 게시물 수정 페이지로 라우트합니다.
// 라우트 전 수정 권한 검사를 server에서 합니다.
const EditPostRouter = async ({ params }: Params) => {
  // 수정 권한 확인
  const canEdit: boolean = await checkEditAuthor(params.postId);

  return (
    <div>
      <Editor canEdit={canEdit} />
    </div>
  );
};

export default EditPostRouter;

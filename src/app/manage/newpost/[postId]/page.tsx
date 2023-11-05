import PostEditor from '@/containers/Editor/PostEditor';
import { checkIsEditableAuthor } from '@/utils/sessionCheck/checkIsEditableAuthor';

// 게시물 수정 페이지로 라우트합니다.
// 라우트 전 수정 권한 검사를 server에서 합니다.
const EditPostRouter = async ({ params }: any) => {
  const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID || '';

  // 수정 권한 확인
  const canEdit: boolean = await checkIsEditableAuthor(params.postId);

  return (
    <div>
      <PostEditor canEdit={canEdit} IMGUR_CLIENT_ID={IMGUR_CLIENT_ID} />
    </div>
  );
};

export default EditPostRouter;

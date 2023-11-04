import Editor from '@/containers/Editor/PostEditor';
import { checkIsEditableAuthor } from '@/utils/sessionCheck/checkIsEditableAuthor';

// 게시물 수정 페이지로 라우트합니다.
// 라우트 전 수정 권한 검사를 server에서 합니다.
const EditPostRouter = async ({ params }: any) => {
  // 수정 권한 확인
  const canEdit: boolean = await checkIsEditableAuthor(params.postId);

  return (
    <div>
      <Editor canEdit={canEdit} />
    </div>
  );
};

export default EditPostRouter;

import PostEditor from '@/containers/Editor/PostEditor';

// 게시글 작성 페이지(Editor)로 라우트합니다.
const NewPostRouter = () => {
  const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID || '';
  return (
    <div>
      <PostEditor IMGUR_CLIENT_ID={IMGUR_CLIENT_ID} />
    </div>
  );
};

export default NewPostRouter;

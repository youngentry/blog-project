import PostItem from '@/containers/Post/PostItem';
import { checkSameAuthor } from '@/utils/sessionCheck/checkSameAuthor';
import { getServerSession } from 'next-auth';

// 게시글 페이지로 라우트합니다.
// 게시글의 id를 Post component에 전달합니다.
const PostRouter = async (props: any) => {
  const { postId }: { postId: string } = props.params;

  // 게시글 작성자 아이디와 로그인 유저가 동일한 아이디인지 확인하기 위해 유저 email을 props로 전달합니다.
  const token = await getServerSession(); // 로그인 유저
  const userEmail: string = token?.user?.email || ''; // 로그인 유저 email

  return <div>{postId && <PostItem postId={postId} userEmail={userEmail} />}</div>;
};

export default PostRouter;

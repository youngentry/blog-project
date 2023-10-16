import { useRouter } from 'next/navigation';

import { editPostData } from '@/services/postsFetch';

interface ConfirmEditPostInterface {
  title: string;
  subtitle: string;
  contents: string;
  mainCategoryId: string;
  postId: string | undefined;
}

// 게시물 수정 확인 버튼입니다.
const ConfirmEditPost = (props: ConfirmEditPostInterface) => {
  const router = useRouter(); // 작성 완료되면 게시물로 redirect 합니다.

  const { title, subtitle: selectedSubtitle, contents, mainCategoryId, postId } = props;

  // 수정하기 버튼 클릭 이벤트
  const handleClickEditButton = async () => {
    try {
      const editContents = {
        title,
        subtitle: selectedSubtitle,
        contents,
        mainCategoryId,
      };

      // postId 여부에 따라 POST 요청을 보내는 api가 다릅니다.
      // postId가 없다면 새로운 글을 작성하고, postId가 있다면 게시글을 수정합니다.
      const res = await editPostData(postId || '', editContents);

      // 수정할 게시물이 존재하지 않을 경우
      if (!res) {
        window.alert('수정할 게시물이 존재하지 않습니다.');
        router.push(`/category`);
        return;
      }

      // 게시물로 redirect하기 전 서버를 refresh하여 업데이트 된 DB 데이터를 가져오도록 합니다.
      router.push(`/posts/${res.id}`); // 해당 게시물로 redirect 합니다.
      router.refresh();
    } catch (error) {
      console.error('게시물 수정 오류:', error);
    }
  };

  return (
    <div>
      <button onClick={handleClickEditButton} type='button'>
        작성하기
      </button>
    </div>
  );
};

export default ConfirmEditPost;

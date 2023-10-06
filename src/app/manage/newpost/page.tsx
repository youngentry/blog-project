import Editor from "@/containers/Editor/PostEditor";

// 게시글 작성 페이지(Editor)로 라우트합니다.
const NewPostRouter = async () => {
  return (
    <div>
      <Editor />
    </div>
  );
};

export default NewPostRouter;

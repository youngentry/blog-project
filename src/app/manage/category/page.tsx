import Editor from "@/containers/Editor/PostEditor";
import CategoryEdit from "@/containers/CategoryEdit/CategoryEdit";

// 게시글 작성 페이지(Editor)로 라우트합니다.
const CategoryEditRouter = async () => {
  return (
    <div>
      <CategoryEdit />
    </div>
  );
};

export default CategoryEditRouter;

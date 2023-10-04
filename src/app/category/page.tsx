import Category from "@/containers/Category/Category";

// 카테고리 페이지로 라우트합니다.
const CategoryRouter = (params: any) => {
  const { searchParams } = params;
  return (
    <div>
      <Category searchParams={searchParams} />
    </div>
  );
};

export default CategoryRouter;

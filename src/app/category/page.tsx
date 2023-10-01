import Category, { SearchParams } from "@/containers/Category/Category";
import React from "react";

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

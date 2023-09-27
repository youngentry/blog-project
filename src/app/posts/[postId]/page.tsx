import PostItem from "@/containers/Post/PostItem";
import React from "react";

// 게시글 페이지로 라우트합니다.
// 게시글의 id를 Post component에 전달합니다.
const PostRouter = (props: any) => {
  const { postId }: { postId: string } = props.params;
  return <div>{postId && <PostItem postId={postId} />}</div>;
};

export default PostRouter;

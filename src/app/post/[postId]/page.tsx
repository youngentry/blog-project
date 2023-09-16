import Post from "@/containers/Post/Post";
import React from "react";

const PostRouter = (props: any) => {
  const { postId }: { postId: string } = props.params; // 동적 라우팅 주소

  return <div>{postId && <Post postId={postId} />}</div>;
};

export default PostRouter;

import Post from "@/containers/Post/Post";
import React from "react";

const PostRouter = (props: any) => {
  const { postId }: { postId: string } = props.params;
  return <div>{postId && <Post postId={postId} />}</div>;
};

export default PostRouter;

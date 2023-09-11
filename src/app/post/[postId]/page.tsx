import Post from "@/containers/Post/Post";
import React from "react";

const PostRouter = (props: any) => {
  return <div>{props.params.postId && <Post postId={props.params.postId} />}</div>;
};

export default PostRouter;

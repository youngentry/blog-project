import Editor from "@/containers/Editor/Editor";

const EditPostRouter = async ({ params }: any) => {
  return (
    <div>
      <Editor postId={params.postId} />
    </div>
  );
};

export default EditPostRouter;

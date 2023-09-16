import NewPost from "@/containers/NewPost/NewPost";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

const NewPostRouter = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <NewPost />
    </div>
  );
};

export default NewPostRouter;

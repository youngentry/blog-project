import Image from "next/image";
import styles from "./Post.module.scss";
import { Post } from "@/types/post";
import EditPostButton from "@/components/buttons/EditPostButton";
import { sanitize } from "isomorphic-dompurify";
import axios from "axios";
import DeletePostButton from "@/components/buttons/DeletePostButton";
import Comment from "../Comment/Comment";
import { getServerSession } from "next-auth";
import { checkSameAuthor } from "@/utils/sessionCheck/checkSameAuthor";

// 게시물 하나의 컴포넌트입니다.
const Post = async ({ postId }: { postId: string }) => {
  const response = await axios.get(`http://localhost:3000/api/posts/${postId}`);
  const postData: Post = response.data;
  const postAuthor: string = postData.email;

  const { title, subtitles, contents, src, author, date, commentCount, likes } = postData;

  // 게시물 작성자와 현재 로그인한 user가 같은지 확인하여 "수정", "삭제" 버튼 나타나도록 합니다.
  const token = await getServerSession();
  const userEmail: string = token?.user?.email || "";
  const isSameAuthor: boolean = checkSameAuthor(userEmail, postAuthor);

  return (
    <article className={styles.container}>
      {postData ? (
        <div className={styles.post}>
          <header>
            <h2>{title}</h2>
            <div className={styles.subtitles}>
              <span>{subtitles.join(" ")}</span>
            </div>
            <div className={styles.info}>
              <span>{author}</span>
              <span>{date.toString()}</span>
              {isSameAuthor && (
                <>
                  <EditPostButton postId={postId} />
                  <DeletePostButton postId={postId} />
                </>
              )}
            </div>
          </header>
          <div className={styles.content}>
            <Image src={src} alt="post content image" width={300} height={300} />
            {<div dangerouslySetInnerHTML={{ __html: sanitize(contents) }} />}
          </div>
          <div className={styles.counts}>
            <div>댓글 {commentCount}</div>
            <div>❤ {likes}</div>
          </div>
          <Comment isSameAuthor={isSameAuthor} userEmail={userEmail} />
        </div>
      ) : (
        <div>게시물이 존재하지 않습니다.</div>
      )}
    </article>
  );
};

export default Post;

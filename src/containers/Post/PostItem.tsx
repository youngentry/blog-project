import Image from "next/image";
import styles from "./PostItem.module.scss";
import EditPostButton from "@/components/buttons/EditPostButton";
import { sanitize } from "isomorphic-dompurify";
import DeletePostButton from "@/components/buttons/DeletePostButton";
import Comment from "../Comment/Comment";
import { getServerSession } from "next-auth";
import { checkSameAuthor } from "@/utils/sessionCheck/checkSameAuthor";
import { getPostData } from "@/services/postsFetch";
import { Post } from "@/types/post";

// 게시물 하나의 컴포넌트입니다.
const PostItem = async ({ postId }: { postId: string }) => {
  const postData: Post | false = await getPostData(postId);

  // postData가 존재하지 않는 경우
  if (!postData) {
    return (
      <article className={styles.container}>
        <div>게시물이 존재하지 않습니다.</div>
      </article>
    );
  }

  const { title, subtitles, contents, src, email, author, date, commentCount, likes } = postData;

  // 같은 작성자인 경우에는 '수정', '삭제' 버튼이 나타나도록 합니다.
  const token = await getServerSession(); // 로그인 유저
  const userEmail: string = token?.user?.email || ""; // 로그인 유저 email
  const isSameAuthor: boolean = checkSameAuthor(userEmail, email); // 로그인 유저와 게시물 작성자 비교

  return (
    <article className={styles.container}>
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
        <Comment postId={postId} userEmail={userEmail} />
      </div>
    </article>
  );
};

export default PostItem;

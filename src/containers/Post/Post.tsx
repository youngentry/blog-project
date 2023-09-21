import { connectDB } from "@/utils/db/db";
import Image from "next/image";
import styles from "./Post.module.scss";
import { Post } from "@/types/post";
import { isSameAuthor } from "@/utils/sessionCheck/isSameAuthor";
import EditPostButton from "@/components/buttons/EditPostButton";
import { sanitize } from "isomorphic-dompurify";
import axios from "axios";
import DeletePostButton from "@/components/buttons/DeletePostButton";

// 게시물 하나의 컴포넌트입니다.
const Post = async ({ postId }: { postId: string }) => {
  const response = await axios.get(`http://localhost:3000/api/posts/${postId}`);
  const postData: Post = response.data;
  const postAuthor = postData.email;

  // 게시물 작성자와 현재 로그인한 user가 같은지 확인하여 "수정", "삭제" 버튼 나타나도록 함
  const sameAuthor: boolean = await isSameAuthor(postAuthor);

  return (
    <article className={styles.container}>
      {postData ? (
        <div className={styles.post}>
          <header>
            <h2>{postData.title}</h2>
            <div className={styles.subtitles}>
              <span>{postData.subtitles.join(" ")}</span>
            </div>
            <div className={styles.info}>
              <span>{postData.author}</span>
              <span>{postData.date.toString()}</span>
              {sameAuthor && (
                <>
                  <EditPostButton postId={postId} />
                  <DeletePostButton postId={postId} />
                </>
              )}
            </div>
          </header>
          <div className={styles.content}>
            <Image src={postData.src} alt="post content image" width={300} height={300} />
            {<div dangerouslySetInnerHTML={{ __html: sanitize(postData.contents) }} />}
          </div>
          <div className={styles.comment}>
            <div className={styles.counts}>
              <div>댓글 {postData.commentCount}</div>
              <div>❤ {postData.likes}</div>
            </div>
            <form className={styles.form}>
              <div className={styles.thumbnail}>😀</div>
              <div className={styles.write}>
                <div className={styles.account}>
                  <input type="text" placeholder="이름" />
                  <input type="text" placeholder="비밀번호" />
                </div>
                <textarea
                  className={styles.textarea}
                  name=""
                  id=""
                  placeholder="내용을 입력하세요"
                ></textarea>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div>게시물이 존재하지 않습니다.</div>
      )}
    </article>
  );
};

export default Post;

import { connectDB } from "@/utils/db/db";
import Image from "next/image";
import styles from "./Post.module.scss";
import { Post } from "@/types/post";

const Post = async ({ postId }: { postId: string }) => {
  const db = (await connectDB).db("blog");
  const postCollection = db.collection<Post>("posts");

  const postData: Post | null = await postCollection.findOne(
    { id: Number(postId) },
    { projection: { _id: 0 } }
  );

  return (
    <article className={styles.container}>
      {postData ? (
        <div className={styles.post}>
          <header>
            <h2>{postData.title}</h2>
            <div className={styles.subtitles}>
              <span>{postData.subtitles.join(" ")}</span>
            </div>
            <div className={styles.languages}>
              <span>{postData.languages.join(" ")}</span>
            </div>
            <div className={styles.info}>
              <span>{postData.author}</span>
              <span>{postData.date.toString()}</span>
            </div>
          </header>
          {/* {postData.id} */}
          {/* {postData.link} */}
          <div className={styles.content}>
            <Image src={postData.src} alt="post content image" width={300} height={300} />
            {postData.content}
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

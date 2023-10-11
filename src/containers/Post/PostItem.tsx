"use client";

import Image from "next/image";
import styles from "./PostItem.module.scss";
import EditPostButton from "@/components/buttons/EditPostButton";
import { sanitize } from "dompurify";
import DeletePostButton from "@/components/buttons/DeletePostButton";
import Comment from "../Comment/Comment";
import { checkSameAuthor } from "@/utils/sessionCheck/checkSameAuthor";
import Link from "next/link";
import ActivityCounts from "@/components/ActivityCounts/ActivityCounts";
import { useEffect, useState } from "react";
import usePostItem, { UsePostItemInterface } from "@/hooks/usePostItem";
import Spin from "@/components/loadings/Spin/Spin";

// 게시물 하나의 컴포넌트입니다.
const PostItem = ({ postId, userEmail }: { postId: string; userEmail: string }) => {
  const { postData, setPostData, loading }: UsePostItemInterface = usePostItem(postId); // 게시물 데이터
  const [postCommentCount, setPostCommentCount] = useState<number>(0); // 게시물 댓글 갯수

  // 게시물의 댓글 갯수를 표시하는 state입니다.
  useEffect(() => {
    const commentCountData = postData ? postData.commentCount : 0;
    setPostCommentCount(commentCountData);
  }, [postData]);

  // postData가 존재하지 않는 경우
  if (!postData) {
    return (
      <article className={styles.container}>
        {loading ? (
          <Spin size="m" message="게시물을 불러오는 중입니다." />
        ) : (
          <div>게시물이 존재하지 않습니다.</div>
        )}
      </article>
    );
  }

  const { title, subtitle, contents, src, email, author, date, commentCount, likes } = postData;

  // 같은 작성자인 경우에는 '수정', '삭제' 버튼이 나타나도록 합니다.
  const isSameAuthor: boolean = checkSameAuthor(userEmail, email); // 로그인 유저와 게시물 작성자 비교

  return (
    <article className={styles.container}>
      <div className={styles.post}>
        <header>
          <h2>{title || "제목없음"}</h2>
          <div className={styles.subtitle}>
            <Link href={{ pathname: "/category", query: { subtitle } }}>
              <span>{subtitle}</span>
            </Link>
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
          <div dangerouslySetInnerHTML={{ __html: sanitize(contents) }} />
        </div>
        <ActivityCounts
          postId={postId}
          postCommentCount={postCommentCount}
          likes={likes}
          userEmail={userEmail}
        />
        <Comment
          title={title}
          postId={postId}
          userEmail={userEmail}
          postCommentCount={postCommentCount}
          setPostCommentCount={setPostCommentCount}
        />
      </div>
    </article>
  );
};

export default PostItem;

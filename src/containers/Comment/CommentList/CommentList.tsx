"use client";

import React, { useState, useEffect, MouseEvent } from "react";
import styles from "./CommentList.module.scss";
import { CommentListProps, Comments } from "@/types/post";
import { getDateForm } from "@/utils/getDateForm";
import { checkBlogAdmin } from "@/utils/sessionCheck/checkBlogAdmin";

const CommentList = ({ postId, newUpdate, userEmail }: CommentListProps) => {
  const [commentList, setCommentList] = useState<Comments[]>([]);

  const [editComment, setEditComment] = useState<string>("");
  const [editingCommentId, setEditingCommentId] = useState<string>("");

  // 게시물의 댓글을 조회하여 state에 저장합니다.
  useEffect(() => {
    (async () => {
      try {
        // GET 요청을 보냅니다.
        const response = await fetch(`/api/posts/${postId}/comments`, { method: "GET" });
        const parsedData = await response.json();
        const foundComments: Comments[] = parsedData.comments;

        // 불러온 댓글을 state에 저장합니다.
        setCommentList(foundComments);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [postId, newUpdate]);

  // 수정 버튼 클릭 이벤트
  const handleClickEditButton = async (_id: string, originComment: string) => {
    // 수정할 코멘트 정보
    setEditingCommentId(_id);
    setEditComment(originComment);
  };

  // 수정 취소 버튼 클릭 이벤트
  const handleClickCancelEditButton = () => {
    // 수정할 코멘트 정보 초기화
    setEditingCommentId("");
    setEditComment("");
  };

  // 수정 확인 버튼 클릭 이벤트
  const handleClickConfirmEditButton = async (commentId: string) => {
    try {
      // PATCH 요청을 보냅니다.
      const response = await fetch(`/api/posts/${postId}/comments?_id=${commentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment: editComment,
        }),
      });

      // 올바른 응답이 아닌 경우, 알림을 띄우고 함수를 종료합니다.
      if (response.status !== 200) {
        window.alert("수정 권한이 없습니다.");
        return;
      }

      // 수정한 댓글을 반영한 결과를 state에 저장합니다.
      const copiedComments: Comments[] = [...commentList];
      const editedComment: Comments | undefined = copiedComments.find(
        (comment) => String(comment._id) === commentId
      );
      if (editedComment) {
        editedComment.comment = editComment;
      }
      setCommentList(copiedComments);

      // 수정 코멘트 정보 초기화
      setEditingCommentId("");
      setEditComment("");
    } catch (err) {
      console.error(err);
    }
  };

  // 삭제 버튼 클릭 이벤트
  const handleClickDeleteButton = async (commentId: string) => {
    try {
      // GET 요청을 보냅니다.
      const response = await fetch(`/api/posts/${postId}/comments?_id=${commentId}`, {
        method: "DELETE",
      });

      // 올바른 응답이 아닌 경우, 알림을 띄우고 함수를 종료합니다.
      if (response.status !== 200) {
        window.alert("삭제 권한이 없습니다.");
        return;
      }

      // 삭제한 댓글을 제외한 결과를 state에 저장합니다.
      const afterDeleteComments: Comments[] = commentList.filter(
        (comment: Comments) => String(comment._id) !== commentId
      );
      setCommentList(afterDeleteComments);
    } catch (err) {
      console.error(err);
    }
  };

  const [checkingGuestPassword, setCheckingGuestPassword] = useState<boolean>(false);
  const [deletePassword, setDeletePassword] = useState<string>("");

  // 게스트 댓글 삭제 버튼 클릭
  const handleClickGuestDeleteButton = () => {
    setCheckingGuestPassword(true);
    setEditingCommentId("");
    setEditComment("");
  };

  // 게스트 비밀번호 입력 후 삭제확인 버튼 클릭
  const handleClickGuestPasswordConfirm = async (_id: string) => {
    try {
      // POST 요청을 보냅니다.
      const response = await fetch(`/api/posts/${postId}/comments/guest?_id=${_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: deletePassword,
        }),
      });

      // 삭제 실패 시
      if (response.status !== 200) {
        window.alert("비밀번호가 다릅니다.");
      } else {
        //삭제 성공 시
        // 초기화
        setCheckingGuestPassword(false);
        setDeletePassword("");

        // 삭제된 댓글 리스트 렌더링
        const deletedCommentList = [...commentList].filter(
          (comment: Comments) => String(comment._id) != _id
        );
        setCommentList(deletedCommentList);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 게스트 댓글 비밀번호 입력 취소
  const handleClickCancelCheckingPassword = () => {
    setCheckingGuestPassword(false);
    setDeletePassword("");
  };

  return (
    <ul className={styles.commentList}>
      {commentList.map((commentItem: Comments) => {
        let { comment, date, isLoggedIn, nickname, author, thumbnail, _id } = commentItem;
        date = new Date(date); // YYYY.MM.DD 형태로 변환하기 위해 Date 객체로 만듭니다.
        const commentId = String(_id); // key에 할당하기 위해 직렬화합니다.

        // 댓글 수정 및 삭제 권한이 있는지 여부에 따라 삭제 버튼이 나타나도록 합니다.
        const isSameCommenter: boolean = isLoggedIn && userEmail === author; // 동일한 댓글 작성자
        const isBlogAdmin: boolean = checkBlogAdmin(userEmail); // 블로그 관리자
        const canEdit: boolean = isSameCommenter || !isLoggedIn || isBlogAdmin; // 수정 권한

        return (
          <li key={commentId} className={`${styles.commentItem}`}>
            <div className={styles.thumbnail}>{isLoggedIn ? "✅" : "😀"}</div>
            <div className={styles.content}>
              <div className={styles.header}>
                <div className={styles.nickname}>{nickname}</div>
                {canEdit && (
                  <div>
                    <button
                      className={`${styles.editButton} ${!isLoggedIn && styles.hide}`}
                      onClick={() => handleClickEditButton(commentId, comment)}
                    >
                      수정
                    </button>
                    <button
                      className={styles.deleteButton}
                      onClick={
                        isLoggedIn || isBlogAdmin
                          ? () => handleClickDeleteButton(commentId)
                          : () => handleClickGuestDeleteButton()
                      }
                    >
                      삭제
                    </button>
                    <div
                      className={`${styles.guestConfirm} ${
                        checkingGuestPassword && !isLoggedIn && styles.visible
                      }`}
                    >
                      <input
                        type="text"
                        placeholder="비밀번호"
                        value={deletePassword}
                        onChange={(e) => setDeletePassword(e.target.value)}
                      />
                      <button onClick={() => handleClickGuestPasswordConfirm(commentId)}>확인</button>
                      <button onClick={() => handleClickCancelCheckingPassword()}>취소</button>
                    </div>
                  </div>
                )}
              </div>
              <div className={`${styles.body} ${editingCommentId === commentId && styles.hide}`}>
                <p className={`${styles.comment} `}>{comment}</p>
                <p className={styles.date}>{getDateForm(date, true)}</p>
              </div>
              <div className={`${styles.editForm} ${editingCommentId === commentId && styles.editing}`}>
                <textarea
                  className={styles.textarea}
                  placeholder="내용을 입력하세요"
                  value={editComment}
                  onChange={(e) => setEditComment(e.target.value)}
                />
                <button onClick={() => handleClickCancelEditButton()}>취소</button>
                <button onClick={() => handleClickConfirmEditButton(commentId)}>확인</button>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default CommentList;

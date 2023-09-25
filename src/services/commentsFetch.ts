import { Comments, CommentsForm } from "@/types/post";

/**
 * 댓글 리스트를 조회합니다.
 * @param {string} postId
 * @returns {Comments | boolean} commentsData or false
 */
export const getCommentsDataApi = async (postId: string) => {
  // post 요청 주소, 옵션
  const url = `/api/posts/${postId}/comments`;
  const options = { method: "GET" };

  // 요청 결과 반환
  const res = await fetch(url, options);
  const data: Comments[] = await res.json(); // 댓글 리스트
  return res.ok ? data : false;
};

/**
 * 댓글 작성 요청 POST
 * @param {string} postId
 * @param {CommentsForm} body
 * @returns {boolean}
 */
export const postCommentApi = async (postId: string, body: CommentsForm) => {
  // post 요청 주소, 옵션
  const url = `/api/posts/${postId}/comments`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...body,
    }),
  };

  // 요청 결과 반환
  const res = await fetch(url, options);
  return res.ok ? true : false;
};

/**
 * 댓글 수정 요청 PATCH
 * @param {string} postId
 * @param {string} _id
 * @param {string} body
 * @returns {boolean}
 */
export const patchCommentApi = async (postId: string, _id: string, body: string) => {
  // patch 요청 주소, 옵션
  const url = `/api/posts/${postId}/comments?_id=${_id}`;
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      comment: body,
    }),
  };

  // 요청 결과 반환
  const res = await fetch(url, options);
  return res.ok ? true : false;
};

/**
 * 댓글 삭제 요청 DELETE
 * @param {string} postId
 * @param {string} _id
 * @returns {boolean}
 */
export const deleteCommentApi = async (postId: string, _id: string) => {
  // post 요청 주소, 옵션
  const url = `/api/posts/${postId}/comments?_id=${_id}`;
  const options = { method: "DELETE" };

  // 요청 결과 반환
  const res = await fetch(url, options);
  return res.ok ? true : false;
};

/**
 * 게스트 댓글 삭제 요청 POST
 * @param {string} postId
 * @param {string} _id
 * @param {string} password
 * @returns {boolean}
 */
export const postGuestCommentDeletionApi = async (postId: string, _id: string, password: string) => {
  // post 요청 주소, 옵션
  const url = `/api/posts/${postId}/comments/guest?_id=${_id}`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
    }),
  };

  // 요청 결과 반환
  const res = await fetch(url, options);
  return res.ok ? true : false;
};

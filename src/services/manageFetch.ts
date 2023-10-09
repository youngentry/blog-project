import BASE_URL from "@/constants/BASE_URL";
import { setFetchOptions } from "./fetchOptions";

/**
 * 댓글을 작성한 포스트를 조회합니다.
 */
export const getManageCommentsApi = async () => {
  const url = `${BASE_URL}/manage/comments`;
  const options = setFetchOptions("GET");

  // 요청 결과 반환
  const res = await fetch(url, options);
  const data = await res.json(); // 댓글 리스트
  return res.ok ? data : [];
};

/**
 * 좋아요를 누른 포스트를 조회합니다.
 */
export const getManageLikesApi = async () => {
  const url = `${BASE_URL}/manage/likes`;
  const options = setFetchOptions("GET");

  // 요청 결과 반환
  const res = await fetch(url, options);
  const data = await res.json(); // 댓글 리스트
  return res.ok ? data : [];
};

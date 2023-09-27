const baseUrl = "http://localhost:3000/api";

import { Card, Post, PostContents } from "@/types/post";
import { setFetchOptions } from "./fetchOptions";

/**
 * 게시물 카드 리스트를 조회합니다.
 * @returns {Card[]} commentsData or false
 */
export const getCardsData = async () => {
  const url = `${baseUrl}/category/`;
  const options = setFetchOptions("GET");

  // 요청 결과 반환
  const res = await fetch(url, options);
  const data: Card[] = await res.json(); // 댓글 리스트

  return res.ok ? data : false;
};

/**
 * 게시물을 조회합니다.
 * @returns {Post} commentsData or false
 */
export const getPostData = async (postId: string) => {
  const url = `${baseUrl}/posts/${postId}`;
  const options = setFetchOptions("GET");

  // 요청 결과 반환
  const res = await fetch(url, options);
  const data: Post = await res.json(); // 게시물 리스트
  return res.ok ? data : false;
};

/**
 * 게시물을 수정합니다.
 * @returns {boolean} 삭제 결과
 */
export const editPostData = async (postId: string, editContents: PostContents) => {
  const url = `${baseUrl}/manage/newpost/${postId}`;
  const options = setFetchOptions("POST", editContents);

  // "redirect 경로"로 쓰일 "새로운 게시물 id" 또는 "수정한 게시물 id"를 반환합니다.
  const res = await fetch(url, options);
  if (postId) {
    return res.ok ? { id: postId } : false;
  }
  const data = await res.json();
  return res.ok ? { id: data.id } : false;
};

/**
 * 게시물을 삭제합니다.
 * @returns {boolean} 삭제 결과
 */
export const deletePostData = async (postId: string) => {
  const url = `${baseUrl}/manage/posts/${postId}`;
  const options = setFetchOptions("DELETE");

  // 요청 결과 반환
  const res = await fetch(url, options);
  return res.ok ? true : false;
};

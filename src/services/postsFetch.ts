import { CardInterface, PostInterface, PostContentsInterface } from '@/types/types';
import BASE_URL from '@/constants/BASE_URL';

import { setFetchOptions } from './fetchOptions';

/**
 * 게시물 카드 리스트를 조회합니다.
 * @returns {CardInterface[]} commentsData or false
 */
export const getPostCardsData = async (title: string, subtitle: string, author?: string) => {
  const titleQuery = title && `&title=${title}`;
  const subtitleQuery = subtitle && `&subtitle=${subtitle}`;
  const authorQuery = author && `&author=${author}`;

  const url = `${BASE_URL}/category?${titleQuery}${subtitleQuery}${authorQuery}`;
  const options = setFetchOptions('GET');
  // 요청 결과 반환
  const res = await fetch(url, options);
  const data: CardInterface[] = await res.json(); // 댓글 리스트

  return res.ok ? data : [];
};

/**
 * 게시물을 조회합니다.
 * @returns {PostInterface} commentsData or false
 */
export const getPostItemData = async (postId: string) => {
  const url = `${BASE_URL}/posts/${postId}`;
  const options = setFetchOptions('GET');

  // 요청 결과 반환
  const res = await fetch(url, options);
  const data: PostInterface = await res.json(); // 게시물 리스트
  return res.ok ? data : undefined;
};

/**
 * 게시물을 수정합니다.
 * @returns {boolean} 삭제 결과
 */
export const editPostData = async (postId: string, editContents: PostContentsInterface) => {
  const url = `${BASE_URL}/manage/newpost/${postId}`;
  const options = setFetchOptions('POST', editContents);

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
  const url = `${BASE_URL}/manage/posts/${postId}`;
  const options = setFetchOptions('DELETE');

  // 요청 결과 반환
  const res = await fetch(url, options);
  return res.ok;
};

/**
 * 게시물 좋아요룰 업데이트합니다.
 * @returns {boolean} 삭제 결과
 */
export const postLikeCountData = async (postId: string, currentLikeCount: number) => {
  const url = `${BASE_URL}/posts/${postId}/likes`;
  const options = setFetchOptions('PATCH', { currentLikeCount });

  // 좋아요 버튼 클릭 결과를 반환합니다.
  const res = await fetch(url, options);
  const { count } = await res.json();
  return res.ok ? count : currentLikeCount;
};

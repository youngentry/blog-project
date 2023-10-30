import { CommentInterface } from '@/types/types';

/**
 * 부모 댓글 아래에 자식 댓글이 위치하도록 정렬합니다.
 * @param {CommentInterface[]} comments
 * @returns {CommentInterface[]} sortedComments
 */
export const sortCommentList = (comments: CommentInterface[]) => {
  const commentOrderMap = new Map();
  // 부모가 없는 자식 댓글은 바로 앞페이지에 부모 댓글이 존재하므로
  // 정렬을 끝낸 뒤에 concat으로 [...remains, ...sortedComments] 형태로 합쳐줍니다.

  // Map: {A부모id: [A부모, A자식], B부모id: [B부모, B자식]} 과 같이 정렬
  for (const comment of comments) {
    if (comment.depth === 0) {
      commentOrderMap.set(comment._id, [comment]); // Map: {A부모id: [A부모]} 추가
    } else {
      const parentArray = commentOrderMap.get(comment.parentCommentId);
      parentArray.push(comment); // 부모 댓글 배열에 [A부모, A자식]과 같이 추가
    }
  }

  const sortedComments = Array.from(commentOrderMap.values()).flat(); // 배열 평탄화
  return sortedComments;
};

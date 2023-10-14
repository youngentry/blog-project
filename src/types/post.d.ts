import { ObjectId } from 'mongodb';
import { Dispatch, SetStateAction } from 'react';

// 게시물 카드
export interface Card {
  id: number;
  src: string;
  title: string;
  subtitle: string;
  languages: string[];
  author: string;
  email: string;
  date: Date | string;
  commentCount: number;
  likes: string[];
}

// 게시물
export interface Post extends Card {
  _id?: string;
  contents: string;
}

// 게시물 컨텐츠
export interface PostContents {
  title: string;
  subtitle: string;
  contents: string;
}

// 댓글 입력 폼
export interface CommentForm {
  title: string;
  nickname: string;
  password: string;
  comment: string;
}

// 댓글
export interface Comment extends CommentForm {
  _id?: ObjectId;
  parentId: number;
  author: string;
  date: Date;
  thumbnail: string;
  isLoggedIn: boolean;
}

// 댓글 CommentListProps 컴포넌트 프롭스 타입
export interface CommentListProps {
  postId: string;
  newUpdate: boolean;
  userEmail: string;
  postCommentCount: number;
  setPostCommentCount: Dispatch<SetStateAction<number>>;
}

// 댓글 CommentFormProps 컴포넌트 프롭스 타입
export interface CommentFormProps extends CommentListProps {
  title: string;
  setNewUpdate: Dispatch<SetStateAction<boolean>>;
}

export interface SubCategoryType {
  _id?: string | ObjectId;
  role: string;
  title: string;
  parent?: string;
}

export interface CommonCategoryInterface extends SubCategoryType {
  children?: SubCategoryType[];
}

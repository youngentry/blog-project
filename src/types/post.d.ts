import { ObjectId } from 'mongodb';
import { Dispatch, SetStateAction } from 'react';

// 게시물 카드
export interface CardInterface {
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
export interface PostInterface extends CardInterface {
  _id?: string;
  contents: string;
}

// 게시물 컨텐츠
export interface PostContentsInterface {
  title: string;
  subtitle: string;
  contents: string;
}

// 댓글 입력 폼
export interface CommentFormInterface {
  title: string;
  nickname: string;
  password: string;
  comment: string;
}

// 댓글
export interface CommentInterface extends CommentFormInterface {
  _id?: ObjectId;
  parentId: number;
  author: string;
  date: Date;
  thumbnail: string;
  isLoggedIn: boolean;
}

// 댓글 CommentListProps 컴포넌트 프롭스 타입
export interface CommentListPropsInterface {
  postId: string;
  newUpdate: boolean;
  userEmail: string;
  postCommentCount: number;
  setPostCommentCount: Dispatch<SetStateAction<number>>;
}

// 댓글 CommentFormProps 컴포넌트 프롭스 타입
export interface CommentFormPropsInterface extends CommentListPropsInterface {
  title: string;
  setNewUpdate: Dispatch<SetStateAction<boolean>>;
}

export interface SubCategoryInterface {
  _id?: string | ObjectId;
  role: string;
  title: string;
  parent?: string;
}

export interface CommonCategoryInterface extends SubCategoryInterface {
  children?: SubCategoryInterface[];
}

export interface CategorySelectorPropsInterface {
  categoryList: CommonCategoryInterface[];
  setCategoryId: Dispatch<SetStateAction<string>>;
  isSelectCategoryVisible: boolean;
  setIsSelectCategoryVisible: Dispatch<SetStateAction<boolean>>;
  selectedSubtitle: string;
  setSelectedSubtitle: Dispatch<SetStateAction<string>>;
}

export interface SlideItemPropsInterface {
  title: string;
  src: string;
  content: string;
  link: string;
}

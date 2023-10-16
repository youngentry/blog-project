import { ObjectId } from 'mongodb';
import { Dispatch, SetStateAction } from 'react';

// postCard
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

// postItem
export interface PostInterface extends CardInterface {
  _id?: string;
  contents: string;
}

// write, edit post form
export interface PostContentsInterface {
  title: string;
  subtitle: string;
  contents: string;
}

// comment form
export interface CommentFormInterface {
  title: string;
  nickname: string;
  password: string;
  comment: string;
}

// comment
export interface CommentInterface extends CommentFormInterface {
  _id?: ObjectId;
  parentId: number;
  author: string;
  date: Date;
  thumbnail: string;
  isLoggedIn: boolean;
}

// 댓글 CommentListProps 컴포넌트 props
export interface CommentListPropsInterface {
  postId: string;
  newUpdate: boolean;
  userEmail: string;
  postCommentCount: number;
  setPostCommentCount: Dispatch<SetStateAction<number>>;
}

// 댓글 CommentFormProps 컴포넌트 props
export interface CommentFormPropsInterface extends CommentListPropsInterface {
  title: string;
  setNewUpdate: Dispatch<SetStateAction<boolean>>;
}

// subCategory
export interface SubCategoryInterface {
  _id?: string | ObjectId;
  role: string;
  title: string;
  parent?: string;
}

// mainCategory
export interface CommonCategoryInterface extends SubCategoryInterface {
  children?: SubCategoryInterface[];
}

// postEditor 카테고리 선택
export interface CategorySelectorPropsInterface {
  categoryList: CommonCategoryInterface[];
  setMainCategoryId: Dispatch<SetStateAction<string>>;
  selectedSubtitle: string;
  setSelectedSubtitle: Dispatch<SetStateAction<string>>;
  isSelectCategoryVisible?: boolean;
  setIsSelectCategoryVisible?: Dispatch<SetStateAction<boolean>>;
}

// 메인페이지 slideItem props
export interface SlideItemPropsInterface {
  title: string;
  src: string;
  content: string;
  link: string;
}

// credential signUp form
export interface SignUpFormInterface {
  name: string;
  email: string;
  password: string;
}

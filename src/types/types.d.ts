import { ObjectId } from 'mongodb';
import { Dispatch, Ref, SetStateAction } from 'react';

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
  categoryId: string;
}

// write, edit post form
export interface PostContentsInterface {
  title: string;
  subtitle: string;
  contents: string;
}

// comment form
export interface CommentFormInterface {
  postTitle: string;
  nickname: string;
  password: string;
  comment: string;
  parentCommentId?: string | null;
  depth?: number;
  replyToNickname?: string;
  replyToEmail?: string;
}

// comment
export interface CommentInterface extends CommentFormInterface {
  _id?: ObjectId;
  parentId: number;
  postTitle: string;
  author: string;
  date: Date;
  isLoggedIn: boolean;
}

// 댓글 CommentFormProps 컴포넌트 props
export interface CommentFormPropsInterface {
  postId: string;
  postTitle: string;
  newUpdate: boolean;
  userEmail: string;
  postEmail?: string;
  postCommentCount: number;
  setPostCommentCount: Dispatch<SetStateAction<number>>;
  setNewUpdate: Dispatch<SetStateAction<boolean>>;
  parentCommentId?: string | null;
  depth?: number;
  replyToNickname?: string;
  replyToEmail?: string;
  setReplyingCommentId?: Dispatch<SetStateAction<string | null>>;
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

// custom input
export interface CustomInputPropsInterface {
  inputRef?: Ref;
  className?: string;
  placeholder?: string;
  maxLength?: number;
  // eslint-disable-next-line
  inputType?: string;
  injectionProtected?: boolean;
  value: string;
  dispatch: Dispatch<SetStateAction<string>>;
  onKeyDown?: (KeyboardEvent) => void;
}

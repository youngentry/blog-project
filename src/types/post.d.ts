import exp from "constants";
import { ObjectId } from "mongodb";

// 게시물 카드
export interface Card {
  id: number;
  src: string;
  title: string;
  subtitles: string[];
  languages: string[];
  author: string;
  date: Date;
  commentCount: number;
  likes: number;
}

// 게시물
export interface Post extends Card {
  contents: string;
  email: string;
}

// 댓글 입력 폼
export interface CommentsForm {
  nickname: string;
  password: string;
  comment: string;
}

// 댓글
export interface Comments extends CommentsForm {
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
}

// 댓글 CommentFormProps 컴포넌트 프롭스 타입
export interface CommentFormProps extends CommentListProps {
  userEmail: string;
  setNewUpdate: Dispatch<SetStateAction<boolean>>;
}

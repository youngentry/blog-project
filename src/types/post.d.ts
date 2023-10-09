import exp from "constants";
import { ObjectId } from "mongodb";

// 게시물 카드
interface Card {
  id: number;
  src: string;
  title: string;
  subtitle: string;
  languages: string[];
  author: string;
  date: Date | string;
  commentCount: number;
  likes: string[];
}

// 게시물
interface Post extends Card {
  _id?: string;
  contents: string;
  email: string;
}

// 게시물 컨텐츠
interface PostContents {
  title: string;
  subtitle: string;
  contents: string;
}

// 댓글 입력 폼
interface CommentForm {
  title: string;
  nickname: string;
  password: string;
  comment: string;
}

// 댓글
interface Comment extends CommentForm {
  _id?: ObjectId;
  parentId: number;
  author: string;
  date: Date;
  thumbnail: string;
  isLoggedIn: boolean;
}

// 댓글 CommentListProps 컴포넌트 프롭스 타입
interface CommentListProps {
  postId: string;
  newUpdate: boolean;
  userEmail: string;
  postCommentCount: number;
  setPostCommentCount: Dispatch<SetStateAction<number>>;
}

// 댓글 CommentFormProps 컴포넌트 프롭스 타입
interface CommentFormProps extends CommentListProps {
  title: string;
  setNewUpdate: Dispatch<SetStateAction<boolean>>;
}

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

// 댓글 form
export interface CommentProps {
  commentCount: number;
  likes: number;
}

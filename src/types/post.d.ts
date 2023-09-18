import exp from "constants";
import { ObjectId } from "mongodb";

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

export interface Post extends Card {
  contents: string;
  email: string;
}

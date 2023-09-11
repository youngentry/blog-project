import exp from "constants";

export interface card {
  id: number;
  link: string;
  src: string;
  title: string;
  subtitles: string[];
  languages: string[];
  commentCount: number;
  likes: number;
}

export interface post {
  id: number;
  link: string;
  src: string;
  title: string;
  subtitles: string[];
  languages: string[];
  content: string;
  commentCount: number;
  author: string;
  date: Date;
  likes: number;
}

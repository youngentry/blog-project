// 댓글 작성에 필요한 폼의 길이
export const COMMENT_FORM_LENGTH = {
  MIN_NICKNAME: 1,
  MIN_PASSWORD: 1,
  MIN_COMMENT: 1,
  MAX_NICKNAME: 10,
  MAX_PASSWORD: 20,
  MAX_COMMENT: 500,
};

// 회원가입에 필요한 폼의 길이
export const SIGN_UP_FORM_LENGTH = {
  MIN_NAME: 2,
  MAX_NAME: 10,
  MIN_EMAIL: 5,
  MAX_EMAIL: 100,
  MIN_PASSWORD: 4,
  MAX_PASSWORD: 20,
};

// 게시글 제목 길이
export const POST_LENGTH = {
  MIN_TITLE: 1,
  MAX_TITLE: 50,
};

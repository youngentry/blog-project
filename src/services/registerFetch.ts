import { setFetchOptions } from "./fetchOptions";

/**
 * 회원가입 요청 POST
 * @param {string} postId
 * @param {CommentForm} body
 * @returns {boolean}
 */
export const postSignUpApi = async (body: SignUp) => {
  const url = `/api/auth/signup`;
  const options = setFetchOptions("POST", body);

  // 요청 결과 반환
  const res = await fetch(url, options);
  const status = res.status;
  const { message } = await res.json();
  return { status, message };
};

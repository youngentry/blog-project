import { SignUpFormInterface } from '@/types/types';

import { setFetchOptions } from './fetchOptions';
/**
 * 회원가입 요청 POST
 * @param {string} postId
 * @param {CommentForm} body
 * @returns {boolean}
 */
export const postSignUpApi = async (body: SignUpFormInterface) => {
  const url = `/api/auth/signup`;
  const options = setFetchOptions('POST', body);

  // 요청 결과 반환
  const res = await fetch(url, options);
  return !!res.ok;
};

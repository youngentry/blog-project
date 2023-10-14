/**
 *  fetch 요청을 보낼 때 method와 options를 설정합니다.
 * @param {string} "GET", "DELETE", "POST", "PATCH"
 * @param {object|null} body
 * @returns
 */
export const setFetchOptions = (method: string, body: object | null = null) => {
  if (method === 'GET' || method === 'DELETE') {
    const options = { method };
    return options;
  }

  if (method === 'POST' || method === 'PATCH') {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...body,
      }),
    };
    return options;
  }

  throw Error('method not found');
};

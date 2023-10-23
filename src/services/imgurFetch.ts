/**
 * imgur image upload POST
 * @param {FormData} formData
 * @returns
 */
export const postImgur = async (formData: FormData) => {
  const url = `https://api.imgur.com/3/image`;
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
      Accept: 'application/json',
    },
    body: formData,
  };

  // 요청 결과 반환
  const res = await fetch(url, options);
  const data = await res.json();
  return res.ok ? data : undefined;
};

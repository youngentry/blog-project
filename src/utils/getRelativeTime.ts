export const getRelativeTime = (publishedAt: string) => {
  const time = new Date(publishedAt);
  const now = Date.now();
  const difference = now - time.getTime();

  if (difference < 1000 * 60 * 60) return `${Math.floor(difference / (1000 * 60))}분 전`;
  if (difference < 1000 * 60 * 60 * 24) return `${Math.floor(difference / (1000 * 60 * 60))}시간 전`;
  if (difference < 1000 * 60 * 60 * 24 * 7)
    return `${Math.floor(difference / (1000 * 60 * 60 * 24))}일 전`;
  if (difference < 1000 * 60 * 60 * 24 * 30)
    return `${Math.floor(difference / (1000 * 60 * 60 * 24 * 7))}주 전`;
  if (difference < 1000 * 60 * 60 * 24 * 365)
    return `${Math.floor(difference / (1000 * 60 * 60 * 24 * 30))}달 전`;
  return `${Math.floor(difference / (1000 * 60 * 60 * 24 * 30 * 365))}년 전`;
};

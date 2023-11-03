export const getUserRole = (email: string) => {
  const managers: string[] | undefined = process.env.BLOG_MANAGER?.split(','); // blog manager emails: string[]
  const admins: string[] | undefined = process.env.BLOG_ADMIN?.split(','); // blog manager emails: string[]

  // 로그인된 유저의 email이 admin에 포함될 경우 true를 반환합니다.
  if (email && admins && admins.includes(email)) {
    return 'admin';
  }

  // 로그인된 유저의 email이 managers에 포함될 경우 true를 반환합니다.
  if (email && managers) {
    return managers.includes(email);
  }

  return false;
};

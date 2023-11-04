type UserRole = 'admin' | 'tester' | 'visitor';

/**
 * 특정 역할을 가지고 있는 계정인지 확인합니다.
 * @param {string} role 유저 token에 저장된 역할 속성
 * @param {UserRole[]} allowedRoles 허용된 역할 목록
 * @returns boolean
 */
const checkUserRole = (role: string | null | undefined, allowedRoles: UserRole[]): boolean => {
  return role !== null && allowedRoles.includes(role as UserRole);
};

/**
 * 관리자 권한이 있는 계정인지 확인합니다.
 * @param {string} role 유저 token에 저장된 역할 속성
 * @returns boolean
 */
export const checkIsBlogAdmin = (role: string | null | undefined): boolean => {
  return checkUserRole(role, ['admin']);
};

/**
 * 매니저 권한이 있는 계정인지 확인합니다.
 * @param {string} role 유저 token에 저장된 역할 속성
 * @returns boolean
 */
export const checkIsBlogManager = (role: string | null | undefined): boolean => {
  return checkUserRole(role, ['admin', 'tester']);
};

/**
 * 일반 유저 권한이 있는 계정인지 확인합니다.
 * @param {string} role 유저 token에 저장된 역할 속성
 * @returns boolean
 */
export const checkIsUser = (role: string | null | undefined): boolean => {
  return checkUserRole(role, ['admin', 'tester', 'visitor']);
};

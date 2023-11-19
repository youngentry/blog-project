'use client';

import useAlertAndRedirect from '@/hooks/useAlertAndRedirect';
import { ALERT_MESSAGE } from '@/constants/DESCRIPTION';
import { useUserSessionValue } from '@/jotai/userAtom';
import { checkIsBlogAdmin } from '@/utils/sessionCheck/checkUserRole';

import styles from './CategoryEdit.module.scss';
import AddMainCategoryForm from './components/AddMainCategoryForm/AddMainCategoryForm';
import CategoryList from './components/CategoryList/CategoryList';

// 카테고리 에디터
const CategoryEdit = () => {
  const userSession = useUserSessionValue();
  const userRole = userSession?.role || '';
  const isBlogAdmin = checkIsBlogAdmin(userRole);

  // 수정 권한이 없는 경우 '/'로 redirect 합니다.
  useAlertAndRedirect(isBlogAdmin, '/', ALERT_MESSAGE.NOT_EDITABLE);
  if (!isBlogAdmin) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h2>카테고리 에딧 페이지 제목</h2>
      <AddMainCategoryForm />
      <CategoryList />
    </div>
  );
};

export default CategoryEdit;

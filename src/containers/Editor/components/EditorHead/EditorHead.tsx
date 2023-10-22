import { Dispatch, SetStateAction, memo, useState } from 'react';

import { CommonCategoryInterface } from '@/types/types';

import styles from './EditorHead.module.scss';
import CategorySelector from '../CategorySelector/CategorySelector';
import CustomInput from '@/components/inputs/CustomInput/CustomInput';

interface EditorHeadPropsInterface {
  setMainCategoryId: Dispatch<SetStateAction<string>>;
  categoryList: CommonCategoryInterface[];
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  selectedSubtitle: string;
  setSelectedSubtitle: Dispatch<SetStateAction<string>>;
}

// 게시글 작성 시 카테고리 선택창, 게시글 제목
const EditorHead = (props: EditorHeadPropsInterface) => {
  const { title, setTitle, categoryList, setMainCategoryId, selectedSubtitle, setSelectedSubtitle } = props;
  const [isSelectCategoryVisible, setIsSelectCategoryVisible] = useState<boolean>(false); // 카테고리 드롭메뉴 visible 여부

  const categorySelectorProps = {
    categoryList,
    setMainCategoryId,
    isSelectCategoryVisible,
    setIsSelectCategoryVisible,
    selectedSubtitle,
    setSelectedSubtitle,
  };

  return (
    <div className={styles.head}>
      <CategorySelector {...categorySelectorProps} />
      <CustomInput className={styles.title} placeholder='제목을 입력하세요' value={title} dispatch={setTitle} />
    </div>
  );
};

export default memo(EditorHead);

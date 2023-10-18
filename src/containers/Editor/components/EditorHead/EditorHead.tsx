import { Dispatch, SetStateAction, useState } from 'react';

import { CommonCategoryInterface } from '@/types/types';

import CategorySelector from '../CategorySelector/CategorySelector';
import styles from './EditorHead.module.scss';

interface EditorHeadPropsInterface {
  setMainCategoryId: Dispatch<SetStateAction<string>>;
  categoryList: CommonCategoryInterface[];
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  selectedSubtitle: string;
  setSelectedSubtitle: Dispatch<SetStateAction<string>>;
}

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
      <input
        className={styles.title}
        type='text'
        placeholder='제목'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
  );
};

export default EditorHead;

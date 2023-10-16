import { Dispatch, SetStateAction, useState } from 'react';

import { CategorySelectorPropsInterface } from '@/types/types';

import CategorySelector from '../CategorySelector/CategorySelector';
import styles from './EditorHead.module.scss';

export interface EditorHeadPropsInterface extends CategorySelectorPropsInterface {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
}

const EditorHead = (props: EditorHeadPropsInterface) => {
  const { title, setTitle, categoryList, setMainCategoryId, selectedSubtitle, setSelectedSubtitle } = props;
  const [isSelectCategoryVisible, setIsSelectCategoryVisible] = useState<boolean>(false); // 카테고리 드롭메뉴 visible 여부

  const categorySelectorProps: CategorySelectorPropsInterface = {
    categoryList,
    setMainCategoryId,
    isSelectCategoryVisible,
    setIsSelectCategoryVisible,
    selectedSubtitle,
    setSelectedSubtitle,
  };

  return (
    <div className={styles.head}>
      <input
        className={styles.title}
        type='text'
        placeholder='제목'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <CategorySelector {...categorySelectorProps} />
    </div>
  );
};

export default EditorHead;

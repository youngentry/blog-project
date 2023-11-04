import Image from 'next/image';

import { checkIsBlogManager } from '@/utils/sessionCheck/checkUserRole';

import styles from './BlogProfile.module.scss';
import GoHomeButton from '@/components/buttons/GoHomeButton/GoHomeButton';
import NewPostButton from '@/components/buttons/NewPostButton/NewPostButton';
import ManageBlogButton from '@/components/buttons/ManageBlogButton/ManageBlogButton';

const BlogProfile = ({ isBlogManager }: { isBlogManager: boolean }) => {
  return (
    <div className={styles.container}>
      <Image
        className={styles.blogThumbnail}
        src='/images/blog-profile.jpg'
        alt='blog profile'
        width={240}
        height={240}
      />
      <div className={styles.profile}>
        <h2 className={styles.blogName}>
          Youngentry
          <GoHomeButton />
        </h2>
        {isBlogManager && (
          <div className={styles.buttonBox}>
            <NewPostButton />
            <ManageBlogButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogProfile;

import Image from 'next/image';

import { checkBlogManager } from '@/utils/sessionCheck/checkBlogManager';

import styles from './BlogProfile.module.scss';
import GoHomeButton from '@/components/buttons/GoHomeButton/GoHomeButton';
import NewPostButton from '@/components/buttons/NewPostButton/NewPostButton';
import ManageBlogButton from '@/components/buttons/ManageBlogButton/ManageBlogButton';

const BlogProfile = ({ session }: { session: any }) => {
  const isBlogManager = session && checkBlogManager(session.user.email);
  return (
    <div className={styles.container}>
      <Image className={styles.blogThumbnail} src='/profile.jpg' alt='blog profile' width={240} height={240} />
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

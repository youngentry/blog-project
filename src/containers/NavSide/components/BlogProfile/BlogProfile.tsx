'use client';

import Image from 'next/image';

import { checkBlogManager } from '@/utils/sessionCheck/checkBlogManager';

import styles from './BlogProfile.module.scss';
import SearchPostButton from '@/components/buttons/SearchPostButton/SearchPostButton';
import GoHomeButton from '@/components/buttons/GoHomeButton/GoHomeButton';
import NewPostButton from '@/components/buttons/NewPostButton/NewPostButton';

const BlogProfile = ({ session }: { session: any }) => {
  const isBlogManager = session && checkBlogManager(session.user.email);
  return (
    <div className={styles.container}>
      <Image className={styles.blogThumbnail} src='/profile.jpg' alt='blog profile' width={240} height={240} />
      <h2 className={styles.blogName}>Youngentry</h2>
      <div className={styles.buttons}>
        <SearchPostButton boxPosition='left' />
        <GoHomeButton />
        {isBlogManager && <NewPostButton />}
      </div>
    </div>
  );
};

export default BlogProfile;

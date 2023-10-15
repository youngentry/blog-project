import Image from 'next/image';
import { getServerSession } from 'next-auth';

import { UserSessionData } from '@/types/session';
import { checkBlogManager } from '@/utils/sessionCheck/checkBlogManager';

import styles from './BlogProfile.module.scss';
import SearchPostButton from '@/components/buttons/SearchPostButton/SearchPostButton';
import GoHomeButton from '@/components/buttons/GoHomeButton/GoHomeButton';
import NewPostButton from '@/components/buttons/NewPostButton/NewPostButton';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const BlogProfile = async () => {
  const session: UserSessionData | null = await getServerSession(authOptions);

  return (
    <div className={styles.container}>
      <Image src='/profile.jpg' alt='blog profile' width={240} height={200} />
      <h2 className={styles.blogName}>Youngentry</h2>
      <div className={styles.buttons}>
        <SearchPostButton boxPosition='left' />
        <GoHomeButton />
        {session && checkBlogManager(session.user.email) && <NewPostButton />}
      </div>
    </div>
  );
};

export default BlogProfile;

'use client';

import { PostInterface } from '@/types/types';
import useManageLikes, { useManageLikesInterface } from '@/hooks/useManageLikes';
import { DESCRIPTION } from '@/constants/DESCRIPTION';
import { getDateForm } from '@/utils/getDateForm';

import styles from './ManageLikes.module.scss';
import ManageLikeItem from './components/ManageLikeItem/ManageLikeItem';
import ManageDescription from '@/components/descriptions/ManageDescription/ManageDescription';
import NoItem from './components/NoItem/NoItem';
import Spin from '@/components/loadings/Spin/Spin';

const Layout = ({ children }: { children: any }) => {
  return (
    <div className={styles.container}>
      <ManageDescription title='좋아요 한 게시물' description={DESCRIPTION.MANAGE_LIKES} />
      {children}
    </div>
  );
};

export interface ManageLikesInterface {
  [key: string]: PostInterface[];
}

const ManageLikes = ({ email }: { email: string }) => {
  // 좋아요 한 게시물 목록
  const { likes, loading }: useManageLikesInterface = useManageLikes();

  /**
   * 날짜별로 게시물 data 반환
   * @param likes
   * @returns {ManageCommentsInterface}
   */
  const getManageLikesData = (likeData: PostInterface[]) => {
    const result: ManageLikesInterface = {};

    // { "YYYYMMDD": postData } 형태의 object 생성
    likeData.forEach((Like) => {
      const date: string = getDateForm(Like.date);
      result[date] = result[date] ? [...result[date], Like] : [Like];
    });

    return result;
  };

  const manageLikesData: ManageLikesInterface = getManageLikesData(likes);
  const days: string[] = Object.keys(manageLikesData); // 날짜 배열
  // [[comment1, comment2],[comment3, comment4]][0]과 같은 형태로 컴포넌트에 좋아요 한 게시물 배열이 전달됩니다.
  const likedPostsByDay: PostInterface[][] = Object.values(manageLikesData);

  // 로딩 중에 렌더링할 컴포넌트
  if (loading) {
    return (
      <Layout>
        <Spin size='s' />
      </Layout>
    );
  }

  // 게시물이 없을 경우 렌더링할 컴포넌트
  if (!likes.length) {
    return (
      <Layout>
        <NoItem h2='아직 좋아요 한 게시물이 없습니다.' src='/images/manageActivity/likes-activity-sample.png' />;
      </Layout>
    );
  }

  return (
    <Layout>
      {days.map((day: string, index: number) => {
        const likedPosts = likedPostsByDay[index];
        return <ManageLikeItem key={day} day={day} likedPosts={likedPosts} email={email} />;
      })}
    </Layout>
  );
};

export default ManageLikes;

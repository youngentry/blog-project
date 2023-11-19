'use client';

import React, { useState } from 'react';
import { BsFillHeartFill, BsHeart } from 'react-icons/bs';

import { postLikeCountData } from '@/services/postsFetch';
import { useIsUserLoggedIn } from '@/jotai/userAtom';

import styles from './LikePostButton.module.scss';

// 게시물 좋아요 요청 버튼
const LikePostButton = ({
  className,
  likes,
  postId,
  userEmail,
}: {
  className?: string;
  likes: string[];
  postId: string;
  userEmail?: string;
}) => {
  const isLoggedIn = useIsUserLoggedIn();

  const [likeCount, setPostLike] = useState<number>(likes.length); // 좋아요를 누른 유저 배열의 길이
  const [isLiked, setIsLiked] = useState<boolean>(userEmail ? likes.includes(userEmail) : false); // 로그인 여부에 따라 heart 모양 변경

  // 좋아요 요청 성공 시 이벤트
  const handleSuccess = (count: number) => {
    if (isLoggedIn) {
      setIsLiked(!isLiked);
    }

    setPostLike(count);
  };

  const handleClickLikePostButton = async () => {
    try {
      // 게시물 좋아요 api
      const res: number = await postLikeCountData(postId, likeCount);
      handleSuccess(res); // 요청 성공 시 실행
    } catch (err) {
      console.error(err);
      window.alert('서버에 문제가 발생하였습니다. 잠시 후에 시도해주세요.');
    }
  };

  return (
    <button className={`${styles.likePost} ${className}`} onClick={() => handleClickLikePostButton()} type='button'>
      {isLiked ? <BsFillHeartFill /> : <BsHeart />}
      {likeCount}
    </button>
  );
};

export default LikePostButton;

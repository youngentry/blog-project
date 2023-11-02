'use client';

import { signIn } from 'next-auth/react';
import { useState, FormEvent } from 'react';

import { postSignUpApi } from '@/services/registerFetch';
import useAlertAndRedirect from '@/hooks/useAlertAndRedirect';

import styles from './Register.module.scss';

const Register = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  useAlertAndRedirect(isLoggedIn, '/');

  const [name, setNickname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  if (isLoggedIn) {
    return null;
  }
  // submit 성공 시 실행
  const successSubmit = () => {
    // form 초기화
    setNickname('');
    setEmail('');
    setPassword('');

    window.alert('회원가입 되었습니다.');
    signIn();
  };

  // 댓글 작성
  const submitSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const signUpForm = {
      name: name.trim(),
      email: email.trim(),
      password: password.trim(),
    };
    try {
      // POST 요청을 보냅니다.
      const res = await postSignUpApi(signUpForm);

      // 댓글 작성요청 성공 시 실행할 함수
      if (res) {
        successSubmit();
      }
    } catch (err) {
      console.error(err);
      window.alert('댓글 작성 중에 오류가 발생했습니다. 잠시 후에 다시 시도해주세요.');
    }
  };

  return (
    <div className={styles.container}>
      <h2>방문자 회원가입</h2>
      <form onSubmit={(e) => submitSignUp(e)} method='POST' action='/api/auth/signup'>
        <label>
          <input
            name='name'
            type='text'
            placeholder='닉네임'
            value={name}
            onChange={(e) => setNickname(e.target.value)}
            autoComplete='off'
          />
        </label>
        <label className={styles.email}>
          <input
            name='email'
            type='email'
            placeholder='이메일'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete='off'
          />
        </label>
        <label>
          <input
            name='password'
            type='password'
            placeholder='비밀번호'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete='off'
          />
        </label>
        <button type='submit'>회원가입</button>
        <p>* 방문자는 게시물 좋아요, 댓글 활동만 가능합니다.</p>
      </form>
    </div>
  );
};

export default Register;

"use client";

import { useRouter } from "next/navigation";
import styles from "./Register.module.scss";
import { useEffect, useState } from "react";

// 가입 페이지 컴포넌트입니다.
// 현재는 비활성화하여 5초 뒤에 '/'로 되돌려 보냅니다.
const Register = () => {
  const [second, setSecond] = useState(5);

  const router = useRouter();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSecond((prevSecond) => {
        if (prevSecond >= 1) {
          return prevSecond - 1;
        } else {
          clearInterval(intervalId); // second가 0이 되면 interval을 멈춥니다.
          router.push("/"); // 홈 페이지로 리다이렉션합니다.
          return 0;
        }
      });
    }, 1000);
  }, []);

  return (
    <div className={styles.container}>
      <h2>현재 가입 기능은 비활성화 하였습니다. {second}초 뒤 home으로 돌려보냅니다.</h2>
      {/* <h2>닉네임/비밀번호로 로그인하기</h2>
      <form method="POST" action="/api/auth/signup">
        <label>
          <input name="name" type="text" placeholder="닉네임" />
        </label>
        <label className={styles.email}>
          <input name="email" type="email" placeholder="이메일" />
        </label>
        <label>
          <input name="password" type="password" placeholder="비밀번호" />
        </label>
        <button type="submit">로그인</button>
        <p>* 방문자는 방명록, 댓글 작성만 가능합니다.</p>
      </form> */}
    </div>
  );
};

export default Register;

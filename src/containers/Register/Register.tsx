"use client";

import { useRouter } from "next/navigation";
import styles from "./Register.module.scss";
import { useState } from "react";
import { postSignUpApi } from "@/services/registerFetch";

// 가입 페이지 컴포넌트입니다.
// 현재는 비활성화하여 5초 뒤에 '/'로 되돌려 보냅니다.
const Register = () => {
  // const [second, setSecond] = useState(5);

  const router = useRouter();

  const [name, setNickname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setSecond((prevSecond) => {
  //       if (prevSecond >= 1) {
  //         return prevSecond - 1;
  //       } else {
  //         clearInterval(intervalId); // second가 0이 되면 interval을 멈춥니다.
  //         router.push("/"); // 홈 페이지로 리다이렉션합니다.
  //         return 0;
  //       }
  //     });
  //   }, 1000);
  // }, []);

  // 댓글 작성
  const submitSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
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
      window.alert("댓글 작성 중에 오류가 발생했습니다. 잠시 후에 다시 시도해주세요.");
    }
  };

  const successSubmit = () => {
    // form 초기화
    setNickname("");
    setEmail("");
    setPassword("");

    window.alert("회원가입 되었습니다.");
    router.push("/");
  };

  return (
    <div className={styles.container}>
      {/* <h2>현재 가입 기능은 비활성화 하였습니다. {second}초 뒤 home으로 돌려보냅니다.</h2> */}
      <h2>닉네임/비밀번호로 로그인하기</h2>
      <form onSubmit={(e) => submitSignUp(e)} method="POST" action="/api/auth/signup">
        <label>
          <input
            name="name"
            type="text"
            placeholder="닉네임"
            value={name}
            onChange={(e) => setNickname(e.target.value)}
          />
        </label>
        <label className={styles.email}>
          <input
            name="email"
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <input
            name="password"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">로그인</button>
        <p>* 방문자는 방명록, 댓글 작성만 가능합니다.</p>
      </form>
    </div>
  );
};

export default Register;

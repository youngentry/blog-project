import styles from "./Register.module.scss";

const Register = () => {
  return (
    <div className={styles.container}>
      <h2>닉네임/비밀번호로 로그인하기</h2>
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
      </form>
    </div>
  );
};

export default Register;

import NewPostButton from "@/components/buttons/NewPostButton";
import styles from "./NavSideHeader.module.scss";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/temp...nextauth]";
import { checkBlogManager } from "@/utils/sessionCheck/checkBlogManager";

// 사이드 메뉴의 헤더 컴포넌트입니다.
const NavSideHeader = async () => {
  const session: UserSessionData | null = await getServerSession(authOptions);

  return (
    <header className={styles.container}>
      <h2>블로그 프로필</h2>
      <div>{session && checkBlogManager(session.user.email) && <NewPostButton />}</div>
    </header>
  );
};

export default NavSideHeader;

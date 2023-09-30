import NewPostButton from "@/components/buttons/NewPostButton";
import styles from "./NavSideHeader.module.scss";
import { getServerSession } from "next-auth";
import { checkBlogManager } from "@/utils/sessionCheck/checkBlogManager";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Image from "next/image";

// 사이드 메뉴의 헤더 컴포넌트입니다.
const NavSideHeader = async () => {
  const session: UserSessionData | null = await getServerSession(authOptions);

  return (
    <header className={styles.container}>
      <Image src={"/profile.jpg"} alt="blog profile" width={240} height={200} />
      <h2>Young</h2>
      <div className={styles.buttons}>
        <i>🧑</i>
        <div>{session && checkBlogManager(session.user.email) && <NewPostButton />}</div>
        <i>🔎</i>
      </div>
    </header>
  );
};

export default NavSideHeader;

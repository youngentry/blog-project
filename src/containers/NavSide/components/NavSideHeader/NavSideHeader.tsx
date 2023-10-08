import styles from "./NavSideHeader.module.scss";
import { getServerSession } from "next-auth";
import { checkBlogManager } from "@/utils/sessionCheck/checkBlogManager";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Image from "next/image";
import NewPostButton from "@/components/buttons/NewPostButton/NewPostButton";
import SearchPostButton from "@/components/buttons/SearchPostButton/SearchPostButton";
import GoHomeButton from "@/components/buttons/GoHomeButton/GoHomeButton";

// 사이드 메뉴의 헤더 컴포넌트입니다.
const NavSideHeader = async () => {
  const session: UserSessionData | null = await getServerSession(authOptions);

  return (
    <header className={styles.container}>
      <Image src={"/profile.jpg"} alt="blog profile" width={240} height={200} />
      <h2>Youngentry</h2>
      <div className={styles.buttons}>
        <SearchPostButton boxPosition="left" />
        <GoHomeButton />
        {session && checkBlogManager(session.user.email) && <NewPostButton />}
      </div>
    </header>
  );
};

export default NavSideHeader;

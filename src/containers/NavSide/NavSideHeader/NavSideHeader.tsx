import NewPostButton from "@/components/buttons/NewPostButton";
import styles from "./NavSideHeader.module.scss";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { isBlogManager } from "@/utils/sessionCheck/isBlogManager";

const NavSideHeader = async () => {
  const session: UserSessionData | null = await getServerSession(authOptions);

  return (
    <header className={styles.container}>
      <h2>블로그 프로필</h2>
      <div>{session && isBlogManager(session.user.email) && <NewPostButton />}</div>
    </header>
  );
};

export default NavSideHeader;

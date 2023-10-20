import styles from './MainPage.module.scss';
import Slogan from './components/Slogan/Slogan';

const MainPage = () => {
  return (
    <div className={styles.container}>
      <Slogan />
    </div>
  );
};

export default MainPage;

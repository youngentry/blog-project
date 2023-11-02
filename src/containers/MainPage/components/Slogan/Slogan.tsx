import styles from './Slogan.module.scss';
import { Logo } from '@/components/logos/logos';

const Slogan = () => {
  return (
    <div className={styles.slogan}>
      <h2 className={styles.mainTitle}>
        {`Youngentry's`} <br /> Next13 + TypeScript
        <br /> 블로그 프로젝트
      </h2>
      <div className={styles.links}>
        <Logo domainName='github' />
        <Logo domainName='tistory' />
      </div>
    </div>
  );
};

export default Slogan;

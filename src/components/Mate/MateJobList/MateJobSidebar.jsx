import Link from 'next/link';

import styles from '@/components/Common/Sidebar.module.css';

const MateJobSidebar = () => {
  return (
    <div className={styles.Sidebar}>
      <div className={styles.menu}>
        <Link href='/'>내 일정 정보</Link>
      </div>
      <div className={styles.menu}>
        <Link href='/'>나에게 들어온 공고</Link>
      </div>
      <div className={styles.menu}>
        <Link href='/'>내가 지원한 공고</Link>
      </div>
      <div className={styles.menu}>
        <Link href='/'>간병 완료 목록</Link>
      </div>
    </div>
  );
};

export default MateJobSidebar;

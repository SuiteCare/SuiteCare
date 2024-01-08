import Link from 'next/link';

import styles from '@/components/Common/Sidebar.module.css';

const MateManageSidebar = () => {
  return (
    <div className={styles.Sidebar}>
      <h3>내 활동 관리</h3>
      <div className={styles.menu}>
        <Link href='/mate/manage/calendar'>내 일정 정보</Link>
      </div>
      <div className={styles.menu}>
        <Link href='/mate/manage/job_list'>공고 지원 목록</Link>
      </div>
      <div className={styles.menu}>
        <Link href='/mate/manage/history'>간병 수행 내역</Link>
      </div>
    </div>
  );
};

export default MateManageSidebar;

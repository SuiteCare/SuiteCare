import Link from 'next/link';

import styles from '@/components/Common/Sidebar.module.css';

const MateManageSidebar = ({ activeMenu }) => {
  return (
    <div className={styles.Sidebar}>
      <h3>내 활동 관리</h3>
      <div className={`${styles.menu} ${activeMenu === 'calendar' ? styles.active : ''}`}>
        <Link href='/mate/manage/calendar'>내 일정 정보</Link>
      </div>
      <div className={`${styles.menu} ${activeMenu === 'request' ? styles.active : ''}`}>
        <Link href='/mate/manage/request'>나에게 들어온 신청</Link>
      </div>
      <div className={`${styles.menu} ${activeMenu === 'recruitment' ? styles.active : ''}`}>
        <Link href='/mate/manage/recruitment'>공고 지원 목록</Link>
      </div>
      <div className={`${styles.menu} ${activeMenu === 'history' ? styles.active : ''}`}>
        <Link href='/mate/manage/history'>간병 수행 내역</Link>
      </div>
    </div>
  );
};

export default MateManageSidebar;

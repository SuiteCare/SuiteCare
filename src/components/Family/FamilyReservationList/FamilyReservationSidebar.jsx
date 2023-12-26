import Link from 'next/link';

import styles from '@/components/Common/Sidebar.module.css';

const FamilyReservationSidebar = () => {
  return (
    <div className={styles.Sidebar}>
      <div className={styles.menu}>
        <Link href='/'>내 일정 정보</Link>
      </div>
      <div className={styles.menu}>
        <Link href='/'>간병 신청 내역</Link>
      </div>
      <div className={styles.menu}>
        <Link href='/'>결제 대기</Link>
      </div>
      <div className={styles.menu}>
        <Link href='/'>간병 완료 목록</Link>
      </div>
    </div>
  );
};

export default FamilyReservationSidebar;

import Link from 'next/link';

import styles from '@/components/Common/Sidebar.module.css';

const FamilyReservationSidebar = () => {
  return (
    <div className={styles.Sidebar}>
      <h4>내 활동 관리</h4>
      <div className={styles.menu}>
        <Link href='/family/manage'>내 일정 정보</Link>
      </div>
      <div className={styles.menu}>
        <Link href='/family/reservation_list'>간병 신청 내역</Link>
      </div>
      <div className={styles.menu}>
        <Link href='/family/pending_payment'>결제 대기</Link>
      </div>
      <div className={styles.menu}>
        <Link href='/family/reservation_finish'>간병 완료 목록</Link>
      </div>
    </div>
  );
};

export default FamilyReservationSidebar;

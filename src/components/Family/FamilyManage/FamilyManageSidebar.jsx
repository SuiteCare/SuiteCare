import Link from 'next/link';

import styles from '@/components/Common/Sidebar.module.css';

const FamilyManageSidebar = () => {
  const defaultUrl = '/family/manage';

  return (
    <div className={styles.Sidebar}>
      <h3>내 활동 관리</h3>
      <div className={styles.menu}>
        <Link href={`${defaultUrl}/calendar`}>내 일정 정보</Link>
      </div>
      <div className={styles.menu}>
        <Link href={`${defaultUrl}/pending_payments`}>결제 대기 목록</Link>
      </div>
      <div className={styles.menu}>
        <Link href={`${defaultUrl}/history`}>간병 신청 내역</Link>
      </div>
    </div>
  );
};

export default FamilyManageSidebar;

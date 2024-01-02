import Link from 'next/link';

import styles from '@/components/Common/Sidebar.module.css';

const FamilyManageSidebar = ({ activeMenu }) => {
  const defaultUrl = '/family/manage';

  return (
    <div className={styles.Sidebar}>
      <h3>내 활동 관리</h3>
      <div className={`${styles.menu} ${activeMenu === 'calendar' ? styles.active : ''}`}>
        <Link href={`${defaultUrl}/calendar`}>내 일정 정보</Link>
      </div>
      <div className={`${styles.menu} ${activeMenu === 'patient_list' ? styles.active : ''}`}>
        <Link href={`${defaultUrl}/patient_list`}>내 환자 목록</Link>
      </div>
      <div className={`${styles.menu} ${activeMenu === 'pending_payments' ? styles.active : ''}`}>
        <Link href={`${defaultUrl}/pending_payments`}>결제 대기 목록</Link>
      </div>
      <div className={`${styles.menu} ${activeMenu === 'history' ? styles.active : ''}`}>
        <Link href={`${defaultUrl}/history`}>간병 신청 내역</Link>
      </div>
    </div>
  );
};

export default FamilyManageSidebar;

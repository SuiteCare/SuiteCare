import Link from 'next/link';

import styles from '@/components/Common/Sidebar.module.css';

const MenuItem = ({ url, label, isActive }) => (
  <div className={`${styles.menu} ${isActive ? styles.active : ''}`}>
    <Link href={url}>{label}</Link>
  </div>
);

const FamilyManageSidebar = ({ activeMenu }) => {
  const defaultUrl = '/family/manage';

  const menuItems = [
    { key: 'calendar', label: '내 일정 정보', url: `${defaultUrl}/calendar` },
    { key: 'reservation', label: '간병예약 확정', url: `${defaultUrl}/reservation` },
    { key: 'patient_list', label: '내 환자 목록', url: `${defaultUrl}/patient_list` },
    { key: 'pending_payments', label: '결제 대기 목록', url: `${defaultUrl}/pending_payments` },
    { key: 'history', label: '전체 내역', url: `${defaultUrl}/history` },
  ];

  return (
    <div className={styles.Sidebar}>
      <h3>내 활동 관리</h3>
      {menuItems.map((item) => (
        <MenuItem key={item.key} url={item.url} label={item.label} isActive={activeMenu === item.key} />
      ))}
    </div>
  );
};

export default FamilyManageSidebar;

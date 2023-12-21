import styles from '@/components/Common/Sidebar.module.css';

const FamilyReservationSidebar = () => {
  return (
    <div className={styles.Sidebar}>
      <div className={styles.menu}>내 일정 정보</div>
      <div className={styles.menu}>간병 신청 내역</div>
      <div className={styles.menu}>결제 대기</div>
      <div className={styles.menu}>간병 완료 목록</div>
    </div>
  );
};

export default FamilyReservationSidebar;

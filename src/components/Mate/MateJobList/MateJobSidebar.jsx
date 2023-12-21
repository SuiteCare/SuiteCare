import styles from '@/components/Common/Sidebar.module.css';

const MateJobSidebar = () => {
  return (
    <div className={styles.Sidebar}>
      <div className={styles.menu}>내 일정 정보</div>
      <div className={styles.menu}>나에게 들어온 공고</div>
      <div className={styles.menu}>내가 지원한 공고</div>
      <div className={styles.menu}>간병 완료 목록</div>
    </div>
  );
};

export default MateJobSidebar;

import Link from 'next/link';

import styles from '@/components/Common/Sidebar.module.css';

const MateMyPageSidebar = ({ activeMenu }) => {
  const defaultUrl = '/mate/mypage';

  return (
    <div className={styles.Sidebar}>
      <h3>마이페이지</h3>
      <div className={`${styles.menu} ${activeMenu === 'resume' ? styles.active : ''}`}>
        <Link href={`${defaultUrl}/resume`}>메이트 이력서</Link>
      </div>
      <div className={`${styles.menu} ${activeMenu === 'userinfo' ? styles.active : ''}`}>
        <Link href={`${defaultUrl}/userinfo`}>내 정보 수정</Link>
      </div>
    </div>
  );
};

export default MateMyPageSidebar;

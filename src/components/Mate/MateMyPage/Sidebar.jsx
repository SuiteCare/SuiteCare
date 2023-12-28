import styles from './Sidbar.module.css';

const Sidebar = ({current}) => {
    return <div className={styles.wrapper}>
        <ul>
            <li><a>내 정보 수정</a></li>
            <li><a href='./profile' className={current === 'profile' ? styles.currentLoc : 'default'} >이력서 등록</a></li>
            <li><a>계좌 관리</a></li>
        </ul>
    </div>
};

export default Sidebar;

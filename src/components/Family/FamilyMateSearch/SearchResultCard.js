import styles from './SearchResultCard.module.css';
import default_profile from '@/assets/default_profile.jpg';

const SearchResultCard = ({ data }) => {
  const calAge = ($birth) => ~~((Date.now() - new Date($birth)) / (1000 * 3600 * 24 * 365));

  return (
    <div className={styles.card}>
      <img src={data.profilePic ? data.profilePic : default_profile} />
      <div className={styles.userName}>
        <label>{data.userName}</label>&nbsp;&nbsp;메이트
        <p>
          {data.gender === 'F' ? '여성' : '남성'}, 만 {calAge(data.birth)}세
        </p>
        <p>{data.description}</p>
      </div>
      <div className={styles.userInfo_wrapper}>
        <div className={styles.userInfo}>
          <label>활동지역</label>
          <span>{data.address}</span>
        </div>
        <div className={styles.userInfo}>
          <label>대표서비스</label>
          <span>{data.service}</span>
        </div>
        <div className={styles.userInfo}>
          <label>희망시급</label>
          <span>{data.wage.toLocaleString()}원 이상</span>
        </div>
      </div>
      <button>간병 신청하기</button>
    </div>
  );
};

export default SearchResultCard;

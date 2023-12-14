import styles from './SearchResultCard.module.css';
import default_profile from '@/assets/default_profile.jpg';
import Image from 'next/image';

const SearchResultCard = ({ data }) => {
  const calAge = ($birth) => ~~((Date.now() - new Date($birth)) / (1000 * 3600 * 24 * 365));

  return (
    <div className={styles.card}>
      {data.profile_picture_filename || <Image src={default_profile} alt='profile_picture' />}
      <div className={styles.userName}>
        <label>{data.userName}</label>메이트
        <p>
          {data.gender === 'F' ? '여성' : '남성'}, 만 {calAge(data.birth)}세
        </p>
        <p>{data.introduction}</p>
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

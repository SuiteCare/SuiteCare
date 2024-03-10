import Image from 'next/image';

import styles from './SearchResultCard.module.css';
import defaultProfile from '@/assets/default_profile.jpg';

import { calAge, genderToKo } from '@/utils/calculators.js';
import StarRating from '@/utils/StarRating';

const SearchResultCard = ({ data, showDetail, handleApply }) => {
  return (
    <div className={styles.card}>
      {(
        <Image
          src={`/${data.profile_picture_filename}`}
          width={300}
          height={200}
          alt={`${data.profile_picture_filename}`}
        />
      ) || <Image src={defaultProfile} alt='profile_picture' />}
      <div className={styles.userName}>
        <label>{data.name}</label>({genderToKo(data.gender)}성, 만 {calAge(data.birthday)}세)
        <p>
          수행한 간병 <b>{data.care_times || 0}</b>건<span>|</span>
          <StarRating rate={data.rate || 0} /> {(data.rate || 0).toFixed(1)}
        </p>
        <p>{data.introduction}</p>
      </div>
      <div className={styles.userInfo_wrapper}>
        <div className={styles.userInfo}>
          <label>활동지역</label>
          <span>{`${data.location.split(',').slice(0, 5).join(', ')}${
            data.location.split(',').length > 5 ? ` 외 ${data.location.split(',').length - 5}건` : ''
          }`}</span>
        </div>
        <div className={styles.userInfo}>
          <label>대표서비스</label>
          <span>{`${data.mainservice.split(',').slice(0, 3).join(', ')}${
            data.mainservice.split(',').length > 3 ? ` 외 ${data.mainservice.split(',').length - 3}건` : ''
          }`}</span>
        </div>
        <div className={styles.userInfo}>
          <label>희망시급</label>
          <span>{data.desired_wage?.toLocaleString()}원 이상</span>
        </div>
      </div>
      <div className={styles.search_button_wrapper}>
        <button type='button' onClick={showDetail}>
          상세정보 보기
        </button>
        <button type='submit' onClick={handleApply}>
          간병 제안하기
        </button>
      </div>
    </div>
  );
};

export default SearchResultCard;

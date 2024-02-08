import Image from 'next/image';

import styles from './SearchResultCard.module.css';
import defaultProfile from '@/assets/default_profile.jpg';

import { calAge, genderToKo } from '@/utils/calculators.js';
import StarRating from '@/utils/StarRating';

const SearchResultCard = ({ data, showDetail, handleApply, handleConfirm }) => {
  return (
    <div className={styles.card}>
      {data.profile_picture_filename || <Image src={defaultProfile} alt='profile_picture' />}
      <div className={styles.userName}>
        <label>{data.name}</label>({genderToKo(data.gender)}성, 만 {calAge(data.birthday)}세)
        <p>
          수행한 간병 <b>{data.care_times}</b>건<span>|</span>
          <StarRating rate={data.rate} /> {data.rate?.toFixed(1)}
        </p>
        <p>{data.introduction}</p>
      </div>
      <div className={styles.userInfo_wrapper}>
        <div className={styles.userInfo}>
          <label>활동지역</label>
          <span>{data.location}</span>
        </div>
        <div className={styles.userInfo}>
          <label>대표서비스</label>
          <span>{data.mainservice}</span>
        </div>
        <div className={styles.userInfo}>
          <label>희망시급</label>
          <span>{data.desired_wage?.toLocaleString()}원 이상</span>
        </div>
      </div>
      <div className={styles.search_button_wrapper}>
        <button type='button' onClick={() => showDetail(data.mate_id)}>
          상세정보 보기
        </button>
        {handleConfirm ? (
          <button type='submit' onClick={() => handleConfirm(data.mate_id)}>
            간병인 선택하기
          </button>
        ) : (
          <button type='submit' onClick={() => handleApply(data.mate_id)}>
            간병 신청하기
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchResultCard;

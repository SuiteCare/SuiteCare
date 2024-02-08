import Image from 'next/image';

import styles from '../PaymentCard.module.css';
import defaultProfile from '@/assets/default_profile.jpg';

import { calAge, genderToKo } from '@/utils/calculators';

const PaymentCard = ({ data }) => {
  return (
    <div className={styles.card}>
      {data.profile_picture_filename || <Image src={defaultProfile} alt='profile_picture' />}
      <div>
        <div className={styles.userName}>
          <label>메이트명</label>메이트
          <p>
            {genderToKo(data.gender)}성, 만 {calAge(data.birthday)}세
          </p>
        </div>
        <hr />
        <div className={styles.userName}>
          <label>환자명</label>님<p>진단명</p>
        </div>
      </div>
      <div className={styles.userInfo_wrapper}>
        <div className={styles.userInfo}>
          <label>간병 기간</label>
          <span>기간 (총 0일)</span>
        </div>
        <div className={styles.userInfo}>
          <label>간병 요일</label>
          <span>월, 화</span>
        </div>
        <div className={styles.userInfo}>
          <label>출퇴근시간</label>
          <span>ㅁㄴㅇㄹ</span>
        </div>
        <div className={styles.userInfo}>
          <label>시급</label>
          <span>ㅁㄴㅇㄹ</span>
        </div>
        <div className={styles.userInfo}>
          <label>총 결제액</label>
          <span>ㅁㄴㅇㄹ</span>
        </div>
      </div>
      <div className={styles.search_button_wrapper}>
        <button type='button' onClick={() => alert('상세정보')}>
          예약 상세정보
        </button>
        <button type='button' onClick={() => alert('결제하기')}>
          결제하기
        </button>
      </div>
    </div>
  );
};

export default PaymentCard;

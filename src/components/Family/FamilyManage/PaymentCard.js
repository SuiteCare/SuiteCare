import Image from 'next/image';

import styles from './PaymentCard.module.css';
import defaultProfile from '@/assets/default_profile.jpg';

const PaymentCard = ({ data }) => {
  return (
    <div className={styles.PaymentCard}>
      {data.map((e) => (
        <div className={styles.card} key={e}>
          <Image src={defaultProfile} alt='' />
          <div>
            <p>{e.mate_name || '간병인 미배정'}</p> 메이트님
            <p>{e.start_date}</p>
            <p>{e.end_date}</p>
          </div>
          <div>
            <p>{e.patient_name}</p>
            <p>{e.diagnosis}</p>
          </div>
          <div>
            <button type='button'>예약 상세정보</button>
            <button type='button'>결제하기</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaymentCard;

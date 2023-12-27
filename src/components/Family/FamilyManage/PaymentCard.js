import Image from 'next/image';
import styles from './PaymentCard.module.css';
import default_profile from '@/assets/default_profile.jpg';

const PaymentCard = ({ data }) => {
  return (
    <div className={styles.PaymentCard}>
      {data.map((e, index) => (
        <div className={styles.card} key={index}>
          <Image src={default_profile} />
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
            <button>예약 상세정보</button>
            <button>결제하기</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaymentCard;

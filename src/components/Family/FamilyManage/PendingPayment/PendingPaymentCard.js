import Image from 'next/image';

import usePatientList from '@/services/apis/usePatientList';

import styles from './PaymentCard.module.css';
import defaultProfile from '@/assets/default_profile.jpg';

import { countWeekdays } from '@/utils/calculators';

const PaymentCard = ({ id, data, handleReservationDetailButton, handlePaymentButton }) => {
  const { patientList } = usePatientList(id);
  const selectPatient = ($id) => patientList?.find((e) => e.id === $id);

  console.log(id);
  console.log(data);
  console.log(selectPatient(data.patient_id));

  return (
    <div className={styles.card}>
      {data?.profile_picture_filename || <Image src={defaultProfile} alt='profile_picture' />}
      <div className={styles.contents}>
        <div className={styles.userName}>
          <label>{data.mate_id}의 이름..</label>메이트
          <hr />
        </div>
        <div className={styles.userInfo_wrapper}>
          <div className={styles.userInfo}>
            <label>담당 환자</label>
            <span>
              {selectPatient(data.patient_id)?.name} ({selectPatient(data.patient_id)?.diagnosis_name})
            </span>
          </div>
          <div className={styles.userInfo}>
            <label>간병 기간</label>
            <span>
              {data.start_date} ~ {data.end_date} (총 {countWeekdays(data.start_date, data.end_date, '0,1,2')}일)
            </span>
          </div>
          <div className={styles.userInfo}>
            <label>간병 요일</label>
            <span>detail 가져와야 됨...</span>
          </div>
          <div className={styles.userInfo}>
            <label>출퇴근시간</label>
            <span>detail 가져와야 됨...</span>
          </div>
          <div className={styles.userInfo}>
            <label>시급</label>
            <span>detail 가져와야 됨...</span>
          </div>
          <div className={styles.userInfo}>
            <label>총 결제액</label>
            <span>detail 가져와야 됨...</span>
          </div>
        </div>
      </div>
      <div className={styles.search_button_wrapper}>
        <button type='button' id={data.id} onClick={(e) => handleReservationDetailButton(e)}>
          예약 상세정보
        </button>
        <button type='button' onClick={(e) => handlePaymentButton(e)}>
          결제하기
        </button>
      </div>
    </div>
  );
};

export default PaymentCard;

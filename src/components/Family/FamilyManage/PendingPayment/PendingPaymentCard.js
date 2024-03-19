import Image from 'next/image';
import { useQuery } from 'react-query';

import axiosInstance from '@/services/axiosInstance';
import useModal from '@/hooks/useModal';

import styles from './PaymentCard.module.css';
import defaultProfile from '@/assets/default_profile.jpg';
import LocalLoading from '@/components/Common/Modal/LocalLoading';
import KakaoPayModal from './KakaoPay/KakaoPayModal';

import { calTimeDiff, countWeekdays, normalizeWeekDays, weekdayDic } from '@/utils/calculators';

const PaymentCard = ({ data, handleReservationDetailButton }) => {
  const recruitmentId = data.recruitment_id;

  const {
    data: detailData,
    isError: isDetailDataError,
    isLoading: isDetailDataLoading,
  } = useQuery(
    ['detailData', recruitmentId],
    async () => {
      const [recruitmentDetailResponse, patientDetailResponse] = await Promise.all([
        axiosInstance.get(`/api/v1/recruitment/${recruitmentId}/detail`),
        axiosInstance.get(`/api/v1/recruitment/${recruitmentId}/patient`),
      ]);

      const recruitmentDetail = recruitmentDetailResponse.data;
      const patientDetail = patientDetailResponse.data;

      return { ...recruitmentDetail, ...patientDetail };
    },
    {
      enabled: Boolean(recruitmentId),
    },
  );

  const {
    isModalVisible: isPaymentModalVisible,
    openModal: openPaymentModal,
    closeModal: closePaymentModal,
  } = useModal();

  const handlePaymentButton = () => {
    openPaymentModal();
  };

  return (
    <div className={styles.card}>
      {isPaymentModalVisible && <KakaoPayModal modalData={{ ...data, ...detailData }} closeModal={closePaymentModal} />}
      {isDetailDataLoading && <LocalLoading />}
      <div className={styles.top}>
        <span className={`${detailData?.location === '병원' ? styles.hospital : styles.home}`}>
          {detailData?.location}
        </span>
        <span title={`${detailData?.road_address} ${detailData?.address_detail}`}>
          {detailData?.road_address} {detailData?.address_detail}
        </span>
      </div>
      <section>
        {data?.profile_picture_filename || (
          <Image src={defaultProfile} alt='profile_picture' width={300} height={200} />
        )}
        <div className={styles.contents}>
          <div className={styles.userName}>
            <span>담당 메이트 </span>
            <label>
              {data.mate_name} ({data.mate_resume_id})
            </label>
          </div>
          <div className={styles.userInfo_wrapper}>
            <div className={styles.userInfo}>
              <label>담당 환자</label>
              <span>
                {detailData?.patient_name} ({detailData?.patient_diagnosis_name})
              </span>
            </div>
            <div className={styles.userInfo}>
              <label>간병 기간</label>
              <span>
                {data.start_date} ~ {data.end_date} (총 {countWeekdays(data.start_date, data.end_date, data.weekdays)}
                일)
              </span>
            </div>
            <div className={styles.userInfo}>
              <label>간병 요일</label>
              <span>
                {normalizeWeekDays(data.weekdays)
                  .map((e) => weekdayDic[e])
                  .join(', ')}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.search_button_wrapper}>
          <button type='button' id={data.id} onClick={() => handleReservationDetailButton(detailData)}>
            간병 상세정보
          </button>
        </div>
      </section>
      <hr />
      <section>
        <div>
          <label>총 결제액</label>
          <span>
            {(
              detailData?.wage *
              calTimeDiff(data.start_time, data.end_time) *
              countWeekdays(data.start_date, data.end_date, data.weekdays)
            ).toLocaleString()}
            원
          </span>
        </div>
        <div className={styles.search_button_wrapper}>
          <button type='button' onClick={() => handlePaymentButton(detailData)}>
            결제하기
          </button>
        </div>
      </section>
    </div>
  );
};

export default PaymentCard;

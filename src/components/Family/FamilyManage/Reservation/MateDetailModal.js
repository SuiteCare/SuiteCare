import React from 'react';
import Image from 'next/image';

import useModal from '@/hooks/useModal';

import styles from '@/components/Common/Modal/Modal.module.css';
import defaultProfile from '@/assets/default_profile.jpg';

import { calAge, genderToKo } from '@/utils/calculators.js';
import StarRating from '@/utils/StarRating';
import { phoneHyphenRegex } from '@/utils/regex';

const MateDetailModal = ({ modalData, modalType, closeModal, handleAccept }) => {
  const { handleContentClick } = useModal();

  const getList = (value, nullMsg) => {
    if (value === null) {
      return nullMsg;
    }
    if (typeof value === 'string') {
      return value.split(',').join(', ');
    }
    if (typeof value === 'object') {
      return value?.map((e) => e.name).join(', ');
    }
  };

  return (
    <div className={styles.Modal} onClick={closeModal}>
      <div className={styles.modal_wrapper} onClick={handleContentClick}>
        <div className='close_button'>
          <span onClick={closeModal} />
        </div>
        {modalData.mateResume ? (
          <>
            <div className={styles.profile_section}>
              {(
                <Image
                  src={`/${modalData.matchedMate.profile_picture_filename}`}
                  width={300}
                  height={200}
                  alt={`${modalData.matchedMate.profile_picture_filename}`}
                />
              ) || <Image src={defaultProfile} alt='profile_picture' />}
              <div className={styles.profile_details}>
                <h2>{modalData.matchedMate.name}</h2> ({genderToKo(modalData.matchedMate.gender)}성, 만{' '}
                {calAge(modalData.matchedMate.birthday)}
                세)
                <p>
                  수행한 간병 <b>{modalData.matchedMate.care_times || 0}</b>건<span>|</span>
                  <StarRating rate={modalData.matchedMate.rate || 0} /> {(modalData.matchedMate.rate || 0).toFixed(1)}
                </p>
                <p>📞 {phoneHyphenRegex(modalData.matchedMate.tel) || '전화번호 정보가 없습니다.'}</p>
                <p>📧 {modalData.matchedMate.email || '이메일 정보가 없습니다.'}</p>
              </div>
            </div>
            <div className={styles.introduction}>{modalData.matchedMate.introduction || '소개글이 없습니다.'}</div>

            <div className={`${styles.info_wrapper} ${styles.double}`}>
              <label className={styles.with_line}>활동 지역</label>
              <span>{getList(modalData?.matchedMate.location, '활동 지역이 없습니다.')}</span>
            </div>
            <div className={`${styles.info_wrapper} ${styles.double}`}>
              <label className={styles.with_line}>대표 서비스</label>
              <span>{getList(modalData?.matchedMate.mainservice, '대표 서비스가 없습니다.')}</span>
            </div>

            <div className={`${styles.info_wrapper} ${styles.double}`}>
              <label className={styles.with_line}>연락 가능 시간</label>
              <span>
                {modalData.matchedMate.contact_time_start}~{modalData.matchedMate.contact_time_end}
              </span>
            </div>

            <div className={`${styles.info_wrapper} ${styles.double}`}>
              <label>경력사항</label>
              {modalData.careerList.length > 0 ? (
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>경력 종류</th>
                      <th>상세 내용</th>
                      <th>기간</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modalData.careerList.map((e) => (
                      <tr key={e}>
                        <td>{e.job_name}</td>
                        <td>{e.name}</td>
                        <td>
                          {e.date_start} ~ {e.date_end}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className={styles.introduction}>경력 정보가 없습니다.</div>
              )}
            </div>
            <div className={`${styles.info_wrapper} ${styles.double}`}>
              <label>자격증</label>
              {modalData.certificateList.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th className={styles.th}>자격명</th>
                      <th>코드</th>
                      <th>취득일</th>
                      <th>만료일</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modalData.certificateList.map((e) => (
                      <tr key={e}>
                        <td>{e.name}</td>
                        <td>{e.code}</td>
                        <td>{e.qualification_date}</td>
                        <td>{e.expired_date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className={styles.introduction}>자격증 정보가 없습니다.</div>
              )}
            </div>
            <div className={styles.button_wrapper}>
              {modalType !== 'Offer' ? (
                <button type='button' onClick={() => handleAccept(modalData.matchedMate.mate_resume_id)}>
                  간병 확정하기
                </button>
              ) : (
                <button type='button' onClick={closeModal}>
                  닫기
                </button>
              )}
            </div>
          </>
        ) : (
          <div className='error'>오류가 발생했습니다.</div>
        )}
      </div>
    </div>
  );
};

export default MateDetailModal;

import React from 'react';
import Image from 'next/image';

import useModal from '@/hooks/useModal';

import styles from '@/components/Common/Modal/Modal.module.css';
import defaultProfile from '@/assets/default_profile.jpg';

import { calAge, genderToKo } from '@/utils/calculators.js';

const MateDetailModal = ({ modalData, closeModal }) => {
  const { handleContentClick } = useModal();

  return (
    <div className={styles.Modal} onClick={closeModal}>
      <div className={styles.modal_wrapper} onClick={handleContentClick}>
        <div className='close_button'>
          <span onClick={closeModal} />
        </div>
        <div className={styles.profile_section}>
          {modalData.profile_picture_filename || <Image src={defaultProfile} alt='profile_picture' />}
          <div className={styles.profile_details}>
            <h2>{modalData.mate_name}</h2>메이트
            <p>
              {genderToKo(modalData.gender)}성, 만 {calAge(modalData.birthday)}세
            </p>
            <p>✉️{modalData.mate_email || '이메일 정보가 없습니다.'}</p>
            <p>📞{modalData.tel || '전화번호 정보가 없습니다.'}</p>
          </div>
        </div>
        <div className={styles.introduction}>{modalData.introduction || '소개글이 없습니다.'}</div>
        <div className={styles.info_grid}>
          <div className={`${styles.info_wrapper} ${styles.double}`}>
            <label className={styles.with_line}>활동 지역</label>
            <span>{modalData.address}</span>
          </div>
          <div className={`${styles.info_wrapper} ${styles.double}`}>
            <label className={styles.with_line}>대표 서비스</label>
            <span>{modalData.main_service}</span>
          </div>
          <div className={`${styles.info_wrapper} ${styles.double}`}>
            <label className={styles.with_line}>연락 가능 시간</label>
            <span>
              {modalData.contact_time_start}~{modalData.contact_time_end}
            </span>
          </div>
          <div className={`${styles.info_wrapper} ${styles.double}`}>
            <label className={styles.with_line}>희망 시급</label>
            <span>{modalData.wage.toLocaleString()}원</span>
          </div>
        </div>
        <div className={`${styles.info_wrapper} ${styles.double}`}>
          <label>경력사항</label>
          <table>
            <thead>
              <tr>
                <th>경력사항</th>
                <th>기간</th>
              </tr>
            </thead>
            <tbody>
              {modalData.career.map((e) => (
                <tr key={e}>
                  <td>{e.title}</td>
                  <td>
                    {e.date_start} ~ {e.date_end}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={`${styles.info_wrapper} ${styles.double}`}>
          <label>자격증</label>
          <table>
            <thead>
              <tr>
                <th>자격명</th>
                <th>취득일</th>
                <th>만료일</th>
              </tr>
            </thead>
            <tbody>
              {modalData.certificate.map((e) => (
                <tr key={e}>
                  <td>{e.certificate_name}</td>
                  <td>{e.qualification_date}</td>
                  <td>{e.expired_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.button_wrapper}>
          <button type='submit'>간병 신청하기</button>
        </div>
      </div>
    </div>
  );
};

export default MateDetailModal;

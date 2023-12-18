import styles from '@/components/Common/Modal.module.css';
import React from 'react';
import Image from 'next/image';
import default_profile from '@/assets/default_profile.jpg';
import { calAge } from '@/assets/util.js';

const MateDetailModal = ({ modalData, closeModal }) => {
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.Modal} onClick={closeModal}>
      <div className={styles.modal_wrapper} onClick={handleContentClick}>
        <div className='close_button'>
          <span onClick={closeModal}></span>
        </div>
        <div className={styles.profile_section}>
          {modalData.profile_picture_filename || <Image src={default_profile} alt='profile_picture' />}
          <div className={styles.profile_details}>
            <h2>{modalData.mate_name}</h2>메이트
            <p>{modalData.mate_id}</p>
            <p>
              {modalData.gender === 'F' ? '여성' : '남성'}, 만 {calAge(modalData.birthday)}세
            </p>
          </div>
        </div>
        <div className={styles.introduction}>{modalData.introduction || '소개글이 없습니다.'}</div>
        <div className={styles.info_grid}>
          <div className={styles.info_wrapper}>
            <label>활동 지역</label>
            <p>{modalData.address}</p>
          </div>
          <div className={styles.info_wrapper}>
            <label>대표 서비스</label>
            <p>{modalData.main_service}</p>
          </div>
          <div className={styles.info_wrapper}>
            <label>연락 가능 시간</label>
            <p>
              {modalData.contact_time_start}~{modalData.contact_time_end}
            </p>
          </div>
          <div className={styles.info_wrapper}>
            <label>희망 시급</label>
            <p>{modalData.wage.toLocaleString()}원</p>
          </div>
        </div>
        <div className={styles.info_wrapper}>
          <label>경력사항</label>
          <table>
            <thead>
              <tr>
                <th>경력사항</th>
                <th>기간</th>
              </tr>
            </thead>
            <tbody>
              {modalData.career.map((e, index) => (
                <tr key={index}>
                  <td>{e.title}</td>
                  <td>
                    {e.date_start} ~ {e.date_end}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.info_wrapper}>
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
              {modalData.certificate.map((e, index) => (
                <tr key={index}>
                  <td>{e.certificate_name}</td>
                  <td>{e.qualification_date}</td>
                  <td>{e.expired_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.button_wrapper}>
          <button>간병 신청하기</button>
        </div>
      </div>
    </div>
  );
};

export default MateDetailModal;

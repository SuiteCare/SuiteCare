import React from 'react';
import Image from 'next/image';

import useModal from '@/hooks/useModal';

import styles from '@/components/Common/Modal/Modal.module.css';
import defaultProfile from '@/assets/default_profile.jpg';

import { calAge, genderToKo } from '@/utils/calculators.js';
import StarRating from '@/utils/StarRating';

const MateDetailModal = ({ modalData, closeModal, handleApply, pagePosition }) => {
  const { handleContentClick } = useModal();

  return (
    <div className={styles.Modal} onClick={closeModal}>
      <div className={styles.modal_wrapper} onClick={handleContentClick}>
        <div className='close_button'>
          <span onClick={closeModal} />
        </div>
        <div className={styles.profile_section}>
          {(
            <Image
              src={`/${modalData.profile_picture_filename || 'default_profile.jpg'}`}
              width={300}
              height={200}
              alt={`${modalData.profile_picture_filename || 'profile picture'}`}
            />
          ) || <Image src={defaultProfile} alt='profile_picture' />}
          <div className={styles.profile_details}>
            <h2>{modalData.name || modalData.mate_name}</h2> ({genderToKo(modalData.gender)}성, 만{' '}
            {calAge(modalData.birthday)}세)
            <p>
              수행한 간병 <b>{modalData.care_times || 0}</b>건<span>|</span>
              <StarRating rate={modalData.rate || 0} /> {(modalData.rate || 0).toFixed(1)}
            </p>
            <p>
              📞
              {(pagePosition === 'FamilyCalendar' ? modalData.mateResume.tel : `${modalData.tel?.slice(0, 7)}****`) ||
                '전화번호 정보가 없습니다.'}
            </p>
            <p>📧{modalData.email || modalData.mateResume.email || '이메일 정보가 없습니다.'}</p>
          </div>
        </div>
        <div className={styles.introduction}>{modalData.mateResume.introduction || '소개글이 없습니다.'}</div>
        <div className={styles.info_grid}>
          <div className={`${styles.info_wrapper} ${styles.double}`}>
            <label className={styles.with_line}>활동 지역</label>
            <span>
              {typeof modalData.locationList === 'string'
                ? modalData.locationList.split(',').join(', ')
                : typeof modalData.locationList === 'object'
                  ? Object.values(modalData.locationList)
                      .map((e) => e.name)
                      .join(', ')
                  : '활동 지역 정보가 없습니다.'}
            </span>
          </div>
          <div className={`${styles.info_wrapper} ${styles.double}`}>
            <label className={styles.with_line}>대표 서비스</label>
            <span>
              {' '}
              {typeof modalData.mainServiceList === 'string'
                ? modalData.mainServiceList.split(',').join(', ')
                : typeof modalData.mainServiceList === 'object'
                  ? Object.values(modalData.mainServiceList)
                      .map((e) => e.name)
                      .join(', ')
                  : '주요 서비스 정보가 없습니다.'}
            </span>
          </div>
          <div className={`${styles.info_wrapper} ${styles.double}`}>
            <label className={styles.with_line}>연락 가능 시간</label>
            <span>
              {modalData.mateResume.contact_time_start}~{modalData.mateResume.contact_time_end}
            </span>
          </div>
          <div className={`${styles.info_wrapper} ${styles.double}`}>
            <label className={styles.with_line}>희망 시급</label>
            <span>{modalData.mateResume.desired_wage.toLocaleString()}원</span>
          </div>
        </div>
        <div className={`${styles.info_wrapper} ${styles.double}`}>
          <label>경력사항</label>
          {modalData.careerList.length > 0 ? (
            <table>
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
                  <th>자격명</th>
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
                    <td>{e.expired_date === '9999-12-31' ? '없음' : e.expired_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className={styles.introduction}>자격증 정보가 없습니다.</div>
          )}
        </div>
        <div className={styles.button_wrapper}>
          {pagePosition === 'FamilyCalendar' ? (
            ''
          ) : (
            <button type='submit' onClick={() => handleApply(modalData)}>
              간병 제안하기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MateDetailModal;

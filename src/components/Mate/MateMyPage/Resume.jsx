import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import axiosInstance from '@/services/axiosInstance';
import useAlert from '@/hooks/useAlert';

import styles from './Resume.module.css';
import Career from './Career';
import Certificate from './Certificate';
import Location from './Location';
import UserInfo from './UserInfo';
import MainService from './MainService';

import { minWage } from '@/utils/calculators';

const Resume = ({ data }) => {
  const navigator = useRouter();

  const [formMateResumeData, setFormMateResumeData] = useState({
    profile_picture_filename: '',
    contact_time_start: '09:00',
    contact_time_end: '21:00',
    introduction: '',
    desired_wage: minWage,
  });

  const [formListData, setFormListData] = useState({
    mainServiceList: [],
    locationList: [],
    careerList: [],
    certificateList: [],
  });

  const [changedListData, setChangedListData] = useState({});
  const [changedMateData, setChangedMateData] = useState({});
  const { openAlert, alertComponent } = useAlert();

  const handleItemChange = (e, index, type) => {
    const { name, value } = e.target;

    setFormListData((prevFormData) => {
      const updatedData = { ...prevFormData };

      switch (type) {
        case 'career':
          updatedData.careerList = prevFormData.careerList.map((careerItem, i) =>
            i === index ? { ...careerItem, [name]: value } : careerItem,
          );
          break;

        case 'certificate':
          updatedData.certificateList = prevFormData.certificateList.map((certificateItem, i) =>
            i === index ? { ...certificateItem, [name]: value } : certificateItem,
          );
          break;

        default:
          break;
      }
      return updatedData;
    });
    setChangedListData((prevData) => {
      const updatedData = { ...prevData };

      switch (type) {
        case 'career':
          updatedData.careerList = formListData.careerList.map((careerItem, i) =>
            i === index ? { ...careerItem, [name]: value } : careerItem,
          );
          break;

        case 'certificate':
          updatedData.certificateList = formListData.certificateList.map((certificateItem, i) =>
            i === index ? { ...certificateItem, [name]: value } : certificateItem,
          );
          break;

        default:
          break;
      }
      return updatedData;
    });
  };

  const handleUpdateResume = async () => {
    if (!formMateResumeData.desired_wage) {
      alert('희망 최소시급을 입력하세요.');
      return false;
    }

    const { locationList, mainServiceList } = formListData;

    if (!locationList.length) {
      alert('최소 1개의 활동 지역을 선택하세요.');
      return false;
    }

    if (!mainServiceList.length) {
      alert('최소 1개의 대표서비스를 선택하세요.');
      return false;
    }

    const method = data.resume.mateResume ? 'patch' : 'post';

    try {
      let requestData = {};
      let body = {};
      if (method === 'post') {
        requestData = {
          mateResume: { ...formMateResumeData },
          locationList: formListData.locationList.map((e) => ({ name: e })),
          mainServiceList: formListData.mainServiceList.map((e) => ({ name: e })),
        };

        if (formListData.careerList.length > 0) requestData.careerList = formListData.careerList;
        if (formListData.certificateList.length > 0) requestData.certificateList = formListData.certificateList;

        body = JSON.stringify(requestData); // 이 부분 확인 필요
        console.log('post', body);
      } else if (method === 'patch') {
        requestData = {
          ...changedListData,
        };

        if (Object.keys(changedMateData).length > 0) requestData.mateResume = { ...changedMateData };

        if (changedListData.locationList) {
          requestData.locationList = changedListData.locationList.map((e) => ({ name: e }));
        }

        if (changedListData.mainServiceList) {
          requestData.mainServiceList = changedListData.mainServiceList.map((e) => ({ name: e }));
        }

        body = JSON.stringify(requestData);
        console.log('patch', body);
      }

      const response = await axiosInstance[method](`/api/v1/mate/resume`, body);
      if (response.data) {
        openAlert(`이력서 ${method === 'post' ? '등록' : '수정'}이 완료되었습니다.`);
        setTimeout(() => {
          navigator.reload();
        }, 1000);
      } else {
        openAlert(`이력서 ${method === 'post' ? '등록' : '수정'}에 실패하였습니다.`);
      }
    } catch (error) {
      console.error('업데이트 실패:', error);
      openAlert(`이력서 ${method === 'post' ? '등록' : '수정'}에 실패하였습니다.`);
    }
  };

  const initializeFormData = ($data) => {
    setFormMateResumeData({
      profile_picture_filename: $data.resume?.mate?.profile_picture_filename || 'default_profile.jpg',
      contact_time_start: $data.resume?.mate?.contact_time_start || '09:00',
      contact_time_end: $data.resume?.mate?.contact_time_end || '21:00',
      introduction: $data.resume?.mate?.introduction || '',
      desired_wage: $data.resume?.mate?.desired_wage || minWage,
    });
    setFormListData({
      mainServiceList: $data.resume?.mainServiceList?.map((e) => e.name) || [],
      locationList: $data.resume?.locationList?.map((e) => e.name) || [],
      careerList: $data.resume?.careerList || [],
      certificateList: $data.resume?.certificateList || [],
    });
  };

  useEffect(() => {
    if (data) initializeFormData(data);
  }, [data]);

  return (
    <div className={styles.Resume}>
      {alertComponent}
      <div className={styles.form_wrapper}>
        <form name='resume'>
          <section className={styles.userinfo}>
            <UserInfo
              styles={styles}
              data={data}
              formData={formMateResumeData}
              setFormData={setFormMateResumeData}
              setChangedData={setChangedMateData}
            />
          </section>

          <section className={styles.location}>
            <Location
              styles={styles}
              formData={formListData}
              setFormData={setFormListData}
              setChangedData={setChangedListData}
            />
          </section>

          <section className={styles.career}>
            <Career
              formData={formListData}
              setFormData={setFormListData}
              setChangedData={setChangedListData}
              handleItemChange={handleItemChange}
            />
          </section>

          <section className={styles.certificate}>
            <Certificate
              formData={formListData}
              setFormData={setFormListData}
              setChangedData={setChangedListData}
              handleItemChange={handleItemChange}
            />
          </section>

          <section className={styles.mainService}>
            <MainService formData={formListData} setFormData={setFormListData} setChangedData={setChangedListData} />
          </section>

          <div className='button_wrapper'>
            <button type='button' onClick={handleUpdateResume}>
              {data.resume.mateResume ? '수정하기' : '등록하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Resume;

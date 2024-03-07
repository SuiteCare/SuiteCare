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
      return openAlert('희망 최소시급을 입력하세요.');
    }

    if (formMateResumeData.desired_wage < minWage && formMateResumeData.desired_wage > 0) {
      setFormMateResumeData((prevData) => ({ ...prevData, desired_wage: minWage }));
      setChangedMateData((prevData) => ({ ...prevData, desired_wage: minWage }));
      return openAlert('희망 최소시급은 정부 공시 최저시급보다 낮을 수 없습니다.');
    }

    const { locationList, mainServiceList, careerList, certificateList } = formListData;

    if (!locationList.length) {
      return openAlert('최소 1개의 활동 지역을 선택하세요.');
    }

    if (!mainServiceList.length) {
      return openAlert('최소 1개의 대표서비스를 선택하세요.');
    }

    if (
      !careerList.every((e) => {
        if (Object.keys(e).length > 5) {
          const { id, ...rest } = e;
          return Object.values(rest).every((v) => !!v);
        }
        return false;
      })
    ) {
      return openAlert('경력 사항의 빈 값을 모두 입력해 주세요.');
    }

    if (
      !certificateList.every((e) => {
        if (Object.keys(e).length > 5) {
          const { id, ...rest } = e;
          return Object.values(rest).every((v) => !!v);
        }
        return false;
      })
    ) {
      return openAlert('자격증 목록의 빈 값을 모두 입력해 주세요.');
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

        body = requestData;
        console.log('post', body);
      }
      if (method === 'patch') {
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

        body = requestData;
        console.log('patch', body);

        if (Object.values(body).length === 0) return openAlert('변경할 데이터가 없습니다.');
      }

      const response = await axiosInstance[method](`/api/v1/mate/resume`, body);
      if (response.data) {
        // patch 시 response.data === '' 라서 false로 처리되는데, 추후 ResponseBody 객체가 넘어와 파싱해서 사용할 예정
        openAlert(`이력서 ${method === 'post' ? '등록' : '수정'}이 완료되었습니다.`);
        setTimeout(() => {
          navigator.reload();
        }, 1000);
      } else {
        openAlert(
          `이력서 ${
            method === 'post' ? '등록' : '수정'
          }에 실패하였습니다. (patch라면 수정이 되었을 수 있으니 DB 확인 필요)`,
        );
      }
    } catch (error) {
      console.error('업데이트 실패:', error);
      openAlert(`이력서 ${method === 'post' ? '등록' : '수정'}에 실패하였습니다.`);
    }
  };

  const initializeFormData = ($data) => {
    setFormMateResumeData({
      profile_picture_filename: $data.resume?.mateResume?.profile_picture_filename || 'default_profile.jpg',
      contact_time_start: $data.resume?.mateResume?.contact_time_start || '09:00',
      contact_time_end: $data.resume?.mateResume?.contact_time_end || '21:00',
      introduction: $data.resume?.mateResume?.introduction || '',
      desired_wage: $data.resume?.mateResume?.desired_wage || minWage,
    });
    setFormListData({
      mainServiceList: $data.resume?.mainServiceList?.map((e) => e.name) || [],
      locationList: $data.resume?.locationList?.map((e) => e.name) || [],
      careerList: $data.resume?.careerList?.map((e) => ({ ...e, orderId: e.id })) || [],
      certificateList: $data.resume?.certificateList?.map((e) => ({ ...e, orderId: e.id })) || [],
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

import { useEffect, useState } from 'react';
import Image from 'next/image';

import styles from './Resume.module.css';
import FormLocationList from '@/components/Common/SearchInfo/FormLocationList';
import defaultProfile from '@/assets/default_profile.jpg';
import { renderCareerItem, renderCertificateItem } from './rederInput';

import { calAge, genderToKo, minWage } from '@/utils/calculators';
import TimePicker from '@/utils/TimePicker';

const Resume = ({ data }) => {
  const [formData, setFormData] = useState({
    profilePictureFilename: '',
    contactTimeStart: '09:00',
    contactTimeEnd: '21:00',
    introduction: '',
    mainServiceData: [],
    checkedLoc: [],
    career: [],
    certificate: [],
    wage: minWage,
  });

  const handleContactTimeChange = (type, value) => {
    setFormData((prevData) => ({
      ...prevData,
      contactTimeStart: type === 'start' ? value : prevData.contactTimeStart,
      contactTimeEnd: type === 'end' ? value : prevData.contactTimeEnd,
    }));
  };

  const [wordCnt, setWordCnt] = useState((data.resume?.mate?.introduction || '').length || 0);
  const handlerTextChange = (e) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      introduction: value,
    }));
    setWordCnt(value.length);
  };

  useEffect(() => {
    const checkboxes = document.getElementsByName('location');
    checkboxes.forEach((it) => {
      it.checked = formData?.checkedLoc?.includes(it.value);
    });
  }, [formData?.checkedLoc]);

  const selectAllLocation = (e) => {
    const allLocationCheckboxes = Array.from(document.getElementsByName('location'));
    const isChecked = allLocationCheckboxes.every((checkbox) => checkbox.checked);

    const selectedLocations = isChecked ? [] : allLocationCheckboxes.map((checkbox) => checkbox.value);

    allLocationCheckboxes.forEach((checkbox) => {
      checkbox.checked = !isChecked;
    });

    e.target.checked = !isChecked;

    setFormData((prevFormData) => ({ ...prevFormData, checkedLoc: selectedLocations }));
  };

  const handleAllLocationChange = (e) => {
    selectAllLocation(e);
  };

  const handleCheckboxChange = (checked, value) => {
    setFormData((prevFormData) => {
      const updatedData = { ...prevFormData };

      if (checked) {
        updatedData.checkedLoc = [...prevFormData.checkedLoc, value];
      } else {
        updatedData.checkedLoc = prevFormData.checkedLoc.filter((it) => it !== value);
      }

      return updatedData;
    });
  };

  const addCareer = () => {
    setFormData((prevFormData) => {
      const lastCareer = prevFormData.career[prevFormData.career.length - 1];
      const newCareer = {
        id: (lastCareer ? lastCareer.id : 0) + 1,
      };
      return { ...prevFormData, career: [...(prevFormData.career || []), newCareer] };
    });
  };

  const deleteCareer = (id) => {
    console.log(id, '번째 경력이 지워짐');
    setFormData((prevFormData) => {
      return { ...prevFormData, career: prevFormData.career.filter((it) => it.id !== id) };
    });
  };

  const addCertificate = () => {
    setFormData((prevFormData) => {
      const lastCertificate = prevFormData.certificate[prevFormData.certificate.length - 1];
      const newCertificate = {
        id: (lastCertificate ? lastCertificate.id : 0) + 1,
      };
      return { ...prevFormData, certificate: [...(prevFormData.certificate || []), newCertificate] };
    });
  };

  const deleteCertificate = (id) => {
    setFormData((prevFormData) => {
      return { ...prevFormData, certificate: prevFormData.certificate.filter((it) => it.id !== id) };
    });
  };

  const changeHandler = (checked, id) => {
    setFormData((prevFormData) => {
      const updatedData = { ...prevFormData };

      if (checked) {
        updatedData.mainServiceData = [...prevFormData.mainServiceData, id];
      } else {
        updatedData.mainServiceData = prevFormData.mainServiceData.filter((it) => it !== id);
      }

      return updatedData;
    });
  };

  const handleItemChange = (e, index, type) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => {
      const updatedData = { ...prevFormData };

      switch (type) {
        case 'career':
          updatedData.career = prevFormData.career.map((careerItem, i) =>
            i === index ? { ...careerItem, [name]: value } : careerItem,
          );
          break;

        case 'certificate':
          updatedData.certificate = prevFormData.certificate.map((certificateItem, i) =>
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
    if (!formData.wage) {
      alert('희망 최소시급을 입력하세요.');
      return false;
    }

    if (!formData.checkedLoc.length) {
      alert('최소 1개의 활동 지역을 선택하세요.');
      return false;
    }

    if (!formData.mainServiceData.length) {
      alert('최소 1개의 대표서비스를 입력하세요.');
      return false;
    }

    const method = data.resume.location ? 'patch' : 'post';

    try {
      const body = {
        ...formData,
      };
      console.log('업데이트 완료:', body);
    } catch (error) {
      console.error('업데이트 실패:', error);
    }
  };

  const [isWageInputDisabled, setIsWageInputDisabled] = useState(false);
  const handleWageCheckbox = (e) => {
    if (e.target.checked) {
      setIsWageInputDisabled(true);
      setFormData((prevData) => ({
        ...prevData,
        wage: '무관',
      }));
    } else {
      setIsWageInputDisabled(false);
      setFormData((prevData) => ({
        ...prevData,
        wage: minWage,
      }));
    }
  };

  const initializeFormData = ($data) => {
    setFormData({
      profilePictureFilename: $data.resume?.mate?.profile_picture_filename || defaultProfile,
      contactTimeStart: $data.resume?.mate?.contact_time_start || '09:00',
      contactTimeEnd: $data.resume?.mate?.contact_time_end || '21:00',
      introduction: $data.resume?.mate?.introduction || '',
      mainServiceData: $data.resume?.mainService?.map((it) => it.name) || [],
      checkedLoc: $data.resume?.location?.map((it) => it.name) || [],
      career: $data.resume?.career || [],
      certificate: $data.resume?.certificate || [],
      wage: $data.resume?.mate?.desired_wage || minWage,
    });
  };

  useEffect(() => {
    initializeFormData(data);
  }, [data]);

  const handleFileChange = ($event) => {
    const file = $event.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      profilePictureFilename: file,
    }));
  };

  return (
    <div className={styles.Resume}>
      <div className={styles.form_wrapper}>
        <form name='resume'>
          <section>
            <h3>기본정보</h3>
            <div className={styles.introduce}>
              <div className='input_wrapper'>
                <div className={styles.img_wrapper}>
                  <Image
                    src={formData.profilePictureFilename || data.profile_picture_filename || defaultProfile}
                    alt='profile_picture'
                  />
                  <input type='file' onChange={handleFileChange} />
                </div>
                <div className={styles.basicInfo}>
                  <div>
                    <h2>{data.mypage.name}</h2>
                  </div>
                  <div>
                    <p>
                      {genderToKo(data.mypage.gender)}성 / {data.mypage.birthday} (만 {calAge(data.mypage.birthday)} 세)
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className={styles.contact}>
                  <div className='input_wrapper'>
                    <label htmlFor='contact'>연락 가능 시간</label>
                    <div className='timepicker_wrapper'>
                      <TimePicker
                        time={formData?.contactTimeStart}
                        setTime={(value) => handleContactTimeChange('start', value)}
                        start={0}
                        end={24}
                      />
                      ~
                      <TimePicker
                        time={formData?.contactTimeEnd}
                        setTime={(value) => handleContactTimeChange('end', value)}
                        start={0}
                        end={24}
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.wage}>
                  <div className='input_wrapper'>
                    <label>희망 최소 시급</label>
                    <div>
                      <input
                        type='number'
                        min={minWage}
                        max={1000000}
                        step={10}
                        disabled={isWageInputDisabled}
                        value={formData.wage}
                        onChange={(e) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            wage: e.target.value,
                          }))
                        }
                      />
                      원
                      <div className='checkbox_wrapper'>
                        <input type='checkbox' onChange={(e) => handleWageCheckbox(e)} />
                        <span>무관</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.introduction}>
                  <div className='input_wrapper'>
                    <label htmlFor='introduction'>한줄소개</label>
                    <div>
                      <textarea
                        id='introduction'
                        name='introduction'
                        rows='1'
                        maxLength='100'
                        onChange={handlerTextChange}
                        defaultValue={formData?.introduction}
                      />
                      <div className={styles.wordCnt}>
                        <span>({wordCnt}/100)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className={styles.location}>
            <h3>활동 지역</h3>
            <div className='checkbox_wrapper'>
              <input type='checkbox' id='all' onChange={handleAllLocationChange} />
              <label htmlFor='all'>전체 선택</label>
            </div>
            <div className={styles.checkbox_list_wrapper}>
              <FormLocationList
                onChange={(e) => handleCheckboxChange(e.currentTarget.checked, e.currentTarget.value)}
              />
            </div>
          </section>
          <section className={styles.career}>
            <h3>
              경력
              <button type='button' onClick={addCareer}>
                +
              </button>
            </h3>
            <table>
              <thead>
                <tr>
                  <th>경력 종류</th>
                  <th>경력 세부내용</th>
                  <th>경력 기간</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {formData?.career?.length > 0 ? (
                  formData?.career?.map((careerItem, index) =>
                    renderCareerItem(careerItem, index, handleItemChange, deleteCareer),
                  )
                ) : (
                  <tr>
                    <td colSpan={4}>
                      <span>경력 정보를 추가해 주세요.</span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>

          <section className={styles.certificate}>
            <h3>
              자격증
              <button type='button' onClick={addCertificate}>
                +
              </button>
            </h3>
            <table>
              <thead>
                <tr>
                  <th>자격증명</th>
                  <th>자격증 코드</th>
                  <th>취득일</th>
                  <th>만료일</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {formData?.certificate?.length > 0 ? (
                  formData?.certificate?.map((certificateItem, index) =>
                    renderCertificateItem(certificateItem, index, handleItemChange, deleteCertificate),
                  )
                ) : (
                  <tr>
                    <td colSpan={5}>
                      <span>보유 자격증을 추가해 주세요.</span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
          <section className={styles.mainService}>
            <h3>대표서비스</h3>
            <div>
              {['외출동행', '목욕', '요리', '청소', '재활운동보조', '빨래', '운전'].map((service) => (
                <div key={service}>
                  <span>
                    <input
                      type='checkbox'
                      name='service'
                      value={service}
                      checked={formData?.mainServiceData?.includes(service)}
                      onChange={(e) => {
                        changeHandler(e.currentTarget.checked, e.currentTarget.value);
                      }}
                    />
                    {service}
                  </span>
                </div>
              ))}
            </div>
          </section>
          <div className='button_wrapper'>
            <button type='button' onClick={handleUpdateResume}>
              {data.resume.location ? '수정하기' : '등록하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Resume;

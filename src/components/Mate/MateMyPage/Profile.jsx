import { useEffect, useState } from 'react';

import styles from './Profile.module.css';
import FormLocationList from '@/components/Common/SearchInfo/FormLocationList';

import { calAge } from '@/utils/calculators';
import TimePicker from '@/utils/TimePicker';

const Profile = ({ profile }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData({
      contactTimeStart: profile?.mate?.contact_time_start,
      contactTimeEnd: profile?.mate?.contact_time_end,
      introduction: profile?.mate?.introduction || '',
      wordCnt: (profile?.mate?.introduction || '').length,
      mainServiceData: profile?.mainService?.map((it) => it.main_service_name) || [],
      checkedLoc: profile?.location?.map((it) => it.location_name) || [],
      career: profile?.career || [],
      certificate: profile?.certificate || [],
    });
  }, [profile]);

  console.log(formData);

  const handleContactTimeChange = (type, value) => {
    setFormData((prevData) => ({
      ...prevData,
      contactTimeStart: type === 'start' ? value : prevData.contactTimeStart,
      contactTimeEnd: type === 'end' ? value : prevData.contactTimeEnd,
    }));
  };

  const handlerTextChange = (e) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      introduction: value,
      wordCnt: value.length,
    }));
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
      const newCareer = {
        id: Date.now(),
      };
      return { ...prevFormData, career: [...(prevFormData.career || []), newCareer] };
    });
  };

  const deleteCareer = (id) => {
    setFormData((prevFormData) => {
      return { ...prevFormData, career: prevFormData.career.filter((it) => it.id !== id) };
    });
  };

  const addCertificate = () => {
    setFormData((prevFormData) => {
      const newCertificate = {
        id: Date.now(),
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

  const renderOptions = (options) => {
    return options?.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ));
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

  const renderCareerItem = (careerItem, index) => (
    <div key={`career-${index}`} className={styles.career_item}>
      <select name='job_name' id='job_name' onChange={(e) => handleItemChange(e, index, 'career')}>
        {renderOptions([
          '경력명',
          '간호사',
          '호스피스 간호사',
          '요양보호사',
          '간병인',
          '물리치료사',
          '재활치료사',
          '사회복지사',
        ])}
      </select>
      <input
        type='text'
        id='name'
        name='career_detail'
        placeholder='경력 세부내용'
        value={careerItem.name}
        onChange={(e) => handleItemChange(e, index, 'career')}
      />
      <div>
        <input
          type='date'
          id='date_start'
          name='data_start'
          value={careerItem.date_start}
          onChange={(e) => handleItemChange(e, index, 'career')}
        />
        ~
        <input
          type='date'
          id='date_end'
          name='data_end'
          value={careerItem.date_end}
          onChange={(e) => handleItemChange(e, index, 'career')}
        />
      </div>
      <button type='button' onClick={() => deleteCareer(careerItem.id)}>
        X
      </button>
    </div>
  );

  const renderCertificateItem = (certificateItem, index) => (
    <div key={`certificate-${index}`} className={styles.certificate_item}>
      <input
        name='certificate_name'
        type='text'
        placeholder='자격증명'
        value={certificateItem.certificate_name}
        onChange={(e) => handleItemChange(e, index, 'certificate')}
      />
      <input
        name='certificate_code'
        type='text'
        placeholder='자격증 코드'
        value={certificateItem.certificate_code}
        onChange={(e) => handleItemChange(e, index, 'certificate')}
      />
      <div>
        <div>
          <label htmlFor='qualification_date'>취득일</label>
          <input
            type='date'
            name='qualification_date'
            value={certificateItem.qualification_date}
            onChange={(e) => handleItemChange(e, index, 'certificate')}
          />
        </div>
        <div>
          <label htmlFor='expired_date'>만료일</label>
          <input
            type='date'
            name='expired_date'
            value={certificateItem.expired_date}
            onChange={(e) => handleItemChange(e, index, 'certificate')}
          />
        </div>
      </div>
      <button type='button' onClick={() => deleteCertificate(certificateItem.id)}>
        X
      </button>
    </div>
  );

  const handleUpdateProfile = async () => {
    try {
      const body = {
        ...formData,
      };
      console.log('업데이트 완료:', body);
    } catch (error) {
      console.error('업데이트 실패:', error);
    }
  };

  return (
    <div className={styles.Profile}>
      <div className={styles.form_wrapper}>
        <form name='profile'>
          <section>
            <h3>기본정보</h3>
            <div className={styles.introduce}>
              <div className={styles.img_wrapper}>
                {/* <img /> */}
                {/* <input type='file' /> */}
              </div>
              <div className={styles.basicInfo}>
                <div>
                  <h2>{profile?.mate?.name}</h2>
                </div>
                <div>
                  <p>
                    {profile?.mate?.gender === 'M' ? '남' : '여'} / 만 {calAge(profile?.mate?.birthday)} 세
                  </p>
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
                  <div className={styles.introduction}>
                    <div className='input_wrapper'>
                      <label htmlFor='introduction'>한줄소개</label>
                      <div>
                        <textarea
                          id='introduction'
                          name='introduction'
                          rows='3'
                          maxLength='100'
                          onChange={handlerTextChange}
                          defaultValue={formData?.introduction}
                        />
                        <div className={styles.wordCnt}>
                          <span>{formData?.wordCnt}/100</span>
                        </div>
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
            <div name='careerDiv'>
              {formData?.career?.length > 0 ? (
                formData?.career?.map((careerItem, index) => renderCareerItem(careerItem, index))
              ) : (
                <div />
              )}
            </div>
          </section>

          <section className={styles.certificate}>
            <h3>
              자격증
              <button type='button' onClick={addCertificate}>
                +
              </button>
            </h3>
            {formData?.certificate?.length > 0 ? (
              formData?.certificate?.map((certificateItem, index) => renderCertificateItem(certificateItem, index))
            ) : (
              <div />
            )}
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
            <button type='button' onClick={handleUpdateProfile}>
              수정하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;

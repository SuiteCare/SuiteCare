import React from 'react';

import useAlert from '@/hooks/useAlert';

const MainService = ({ formData, setFormData, setChangedData }) => {
  const { openAlert, alertComponent } = useAlert();

  const cleanUpArray = (arr) => {
    return Array.from(new Set(arr));
  };

  const handleMainServiceChange = (checked, value) => {
    const cleanUpMainServiceList = cleanUpArray(formData.mainServiceList);
    if (checked && cleanUpMainServiceList.length >= 3) {
      const slicedList = cleanUpMainServiceList.slice(0, 3);
      setFormData((prevData) => {
        const updatedData = { ...prevData };
        updatedData.mainServiceList = [...slicedList];
        return updatedData;
      });
      setChangedData((prevData) => {
        const updatedData = { ...prevData };
        updatedData.mainServiceList = [...slicedList];
        return updatedData;
      });
      return openAlert('주요 서비스는 최대 3개까지 선택할 수 있습니다.');
    }
    setFormData((prevData) => {
      const updatedData = { ...prevData };

      if (checked) {
        updatedData.mainServiceList = cleanUpArray([...prevData.mainServiceList, value]);
      } else {
        updatedData.mainServiceList = cleanUpArray(prevData.mainServiceList).filter((it) => it !== value);
      }

      return updatedData;
    });
    setChangedData((prevData) => {
      const updatedData = { ...prevData };

      if (checked) {
        updatedData.mainServiceList = cleanUpArray([...formData.mainServiceList, value]);
      } else {
        updatedData.mainServiceList = cleanUpMainServiceList.filter((it) => it !== value);
      }

      return updatedData;
    });
  };

  return (
    <>
      {openAlert && alertComponent}
      <h3>주요 서비스</h3>
      <div>
        {['외출동행', '목욕', '요리', '청소', '재활운동보조', '빨래', '운전'].map((service) => (
          <div key={service}>
            <span>
              <input
                type='checkbox'
                name='service'
                value={service}
                checked={formData?.mainServiceList?.includes(service)}
                onChange={(e) => {
                  handleMainServiceChange(e.currentTarget.checked, e.currentTarget.value);
                }}
              />
              {service}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default MainService;

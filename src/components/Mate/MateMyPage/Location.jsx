import React, { useEffect } from 'react';

import useAlert from '@/hooks/useAlert';

import FormLocationList from '@/components/Common/SearchInfo/FormLocationList';

const Location = ({ styles, formData, setFormData, setChangedData }) => {
  const { openAlert, alertComponent } = useAlert();

  const handleCheckboxChange = (checked, value) => {
    if (checked && formData.locationList.length >= 5) {
      const slicedList = formData.locationList.slice(0, 5);
      setFormData((prevData) => {
        const updatedData = { ...prevData };
        updatedData.locationList = [...slicedList];
        return updatedData;
      });
      setChangedData((prevData) => {
        const updatedData = { ...prevData };
        updatedData.locationList = [...slicedList];
        return updatedData;
      });
      return openAlert('활동 지역은 최대 5개까지 선택할 수 있습니다.');
    }
    setFormData((prevData) => {
      const updatedData = { ...prevData };

      if (checked) {
        updatedData.locationList = [...prevData.locationList, value];
      } else {
        updatedData.locationList = prevData.locationList.filter((it) => it !== value);
      }

      return updatedData;
    });
    setChangedData((prevData) => {
      const updatedData = { ...prevData };

      if (checked) {
        updatedData.locationList = [...formData.locationList, value];
      } else {
        updatedData.locationList = formData.locationList.filter((it) => it !== value);
      }

      return updatedData;
    });
  };

  useEffect(() => {
    const checkboxes = document.getElementsByName('location');
    checkboxes.forEach((it) => {
      it.checked = formData?.locationList?.includes(it.value);
    });
  }, [formData?.locationList]);

  return (
    <>
      {openAlert && alertComponent}
      <h3>활동 지역</h3>
      <div className={styles.checkbox_list_wrapper}>
        <FormLocationList onChange={(e) => handleCheckboxChange(e.currentTarget.checked, e.currentTarget.value)} />
      </div>
    </>
  );
};

export default Location;

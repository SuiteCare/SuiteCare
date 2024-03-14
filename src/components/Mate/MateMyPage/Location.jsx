import React, { useEffect } from 'react';

import useAlert from '@/hooks/useAlert';

import FormLocationList from '@/components/Common/SearchInfo/FormLocationList';

const Location = ({ styles, formData, setFormData, setChangedData }) => {
  const { openAlert, alertComponent } = useAlert();

  const cleanUpArray = (arr) => {
    return Array.from(new Set(arr));
  };

  const handleCheckboxChange = (checked, value) => {
    const cleanUpLocationList = cleanUpArray(formData.locationList);

    if (checked && cleanUpLocationList.length >= 5) {
      const slicedList = cleanUpLocationList.slice(0, 5);
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
        updatedData.locationList = cleanUpArray([...prevData.locationList, value]);
      } else {
        updatedData.locationList = cleanUpArray(prevData.locationList).filter((it) => it !== value);
      }

      return updatedData;
    });
    setChangedData((prevData) => {
      const updatedData = { ...prevData };

      if (checked) {
        updatedData.locationList = cleanUpArray([...formData.locationList, value]);
      } else {
        updatedData.locationList = cleanUpLocationList.filter((it) => it !== value);
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

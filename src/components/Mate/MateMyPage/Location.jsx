import React, { useEffect } from 'react';

import FormLocationList from '@/components/Common/SearchInfo/FormLocationList';

const Location = ({ styles, formData, setFormData, setChangedData }) => {
  const handleCheckboxChange = (checked, value) => {
    console.log(formData.locationList);
    setFormData((prevFormData) => {
      const updatedData = { ...prevFormData };

      if (checked) {
        updatedData.locationList = [...prevFormData.locationList, value];
      } else {
        updatedData.locationList = prevFormData.locationList.filter((it) => it !== value);
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
      <h3>활동 지역</h3>
      <div className={styles.checkbox_list_wrapper}>
        <FormLocationList onChange={(e) => handleCheckboxChange(e.currentTarget.checked, e.currentTarget.value)} />
      </div>
    </>
  );
};

export default Location;

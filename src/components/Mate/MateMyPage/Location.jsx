import React, { useEffect } from 'react';

import FormLocationList from '@/components/Common/SearchInfo/FormLocationList';

const Location = ({ styles, formData, setFormData }) => {
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

  useEffect(() => {
    const checkboxes = document.getElementsByName('location');
    checkboxes.forEach((it) => {
      it.checked = formData?.checkedLoc?.includes(it.value);
    });
  }, [formData?.checkedLoc]);

  return (
    <>
      <h3>활동 지역</h3>
      <div className='checkbox_wrapper'>
        <input type='checkbox' id='all' onChange={handleAllLocationChange} />
        <label htmlFor='all'>전체 선택</label>
      </div>
      <div className={styles.checkbox_list_wrapper}>
        <FormLocationList onChange={(e) => handleCheckboxChange(e.currentTarget.checked, e.currentTarget.value)} />
      </div>
    </>
  );
};

export default Location;

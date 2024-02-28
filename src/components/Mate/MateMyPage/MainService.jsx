import React from 'react';

const MainService = ({ formData, setFormData, setChangedData }) => {
  const handleMainServiceChange = (checked, value) => {
    setFormData((prevFormData) => {
      const updatedData = { ...prevFormData };

      if (checked) {
        updatedData.mainServiceList = [...prevFormData.mainServiceList, value];
      } else {
        updatedData.mainServiceList = prevFormData.mainServiceList.filter((it) => it !== value);
      }

      return updatedData;
    });
    setChangedData((prevData) => {
      const updatedData = { ...prevData };

      if (checked) {
        updatedData.mainServiceList = [...formData.mainServiceList, value];
      } else {
        updatedData.mainServiceList = formData.mainServiceList.filter((it) => it !== value);
      }

      return updatedData;
    });
  };

  return (
    <>
      <h3>대표서비스</h3>
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

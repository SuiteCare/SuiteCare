import React from 'react';

const Career = ({ formData, setFormData, handleItemChange }) => {
  const addCareer = () => {
    setFormData((prevFormData) => {
      const lastCareer = prevFormData.careerList[prevFormData.careerList.length - 1];
      const newCareer = {
        orderId: (lastCareer ? lastCareer.orderId : 0) + 1,
      };
      return { ...prevFormData, careerList: [...(prevFormData.careerList || []), newCareer] };
    });
  };

  const deleteCareer = (orderId) => {
    setFormData((prevFormData) => {
      return { ...prevFormData, careerList: prevFormData.careerList.filter((it) => it.orderId !== orderId) };
    });
  };

  const renderOptions = (options) => {
    return options?.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ));
  };

  const renderCareerItem = (careerItem, index) => (
    <tr key={careerItem.orderId}>
      <td>
        order: {careerItem.orderId} / id: {careerItem.id}
      </td>
      <td>
        <select
          defaultValue={careerItem.job_name}
          name='job_name'
          id='job_name'
          onChange={(e) => handleItemChange(e, index, 'career')}
        >
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
      </td>
      <td>
        <input
          type='text'
          id='name'
          name='name'
          placeholder='경력 세부내용'
          value={careerItem.name}
          onChange={(e) => handleItemChange(e, index, 'career')}
        />
      </td>
      <td>
        <input
          type='date'
          id='date_start'
          name='date_start'
          value={careerItem.date_start}
          onChange={(e) => handleItemChange(e, index, 'career')}
        />
        ~
        <input
          type='date'
          id='date_end'
          name='date_end'
          value={careerItem.date_end}
          onChange={(e) => handleItemChange(e, index, 'career')}
        />
      </td>
      <td>
        <button type='button' onClick={() => deleteCareer(careerItem.orderId)} />
      </td>
    </tr>
  );

  return (
    <>
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
          {formData?.careerList?.length > 0 ? (
            formData?.careerList?.map((careerItem, index) =>
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
    </>
  );
};

export default Career;

import React from 'react';

const Certificate = ({ formData, setFormData, setChangedData, handleItemChange }) => {
  const addCertificate = () => {
    const lastCertificate = formData.certificateList[formData.certificateList.length - 1];
    const newCertificate = {
      orderId: (lastCertificate ? lastCertificate.orderId : 0) + 1,
      id: null,
    };
    setFormData((prevFormData) => {
      return { ...prevFormData, certificateList: [...(prevFormData.certificateList || []), newCertificate] };
    });
    setChangedData((prevFormData) => {
      return { ...prevFormData, certificateList: [...(prevFormData.certificateList || []), newCertificate] };
    });
  };

  const deleteCertificate = (orderId) => {
    setFormData((prevFormData) => {
      return { ...prevFormData, certificateList: prevFormData.certificateList.filter((it) => it.orderId !== orderId) };
    });

    const deletedItem = formData.certificateList.filter((it) => it.orderId === orderId)[0];
    if (deletedItem.id) {
      setChangedData((prevFormData) => {
        return {
          ...prevFormData,
          certificateList: [...(prevFormData.certificateList || []), { ...deletedItem, delete: true }],
        };
      });
    } else {
      setChangedData((prevFormData) => {
        return {
          ...prevFormData,
          certificateList: prevFormData.certificateList.filter((it) => it.orderId !== orderId),
        };
      });
    }
  };

  const renderCertificateItem = (certificateItem, index) => (
    <tr key={certificateItem.orderId}>
      <td>
        <input
          id={certificateItem.id}
          name='name'
          type='text'
          placeholder='자격증명'
          value={certificateItem.name}
          onChange={(e) => handleItemChange(e, index, 'certificate')}
        />
      </td>
      <td>
        <input
          name='code'
          type='text'
          placeholder='자격증 코드'
          value={certificateItem.code}
          onChange={(e) => handleItemChange(e, index, 'certificate')}
        />
      </td>
      <td>
        <input
          type='date'
          name='qualification_date'
          value={certificateItem.qualification_date}
          onChange={(e) => handleItemChange(e, index, 'certificate')}
        />
      </td>
      <td>
        <input
          type='date'
          name='expired_date'
          value={certificateItem.expired_date}
          onChange={(e) => handleItemChange(e, index, 'certificate')}
        />
      </td>
      <td>
        <button type='button' onClick={() => deleteCertificate(certificateItem.orderId)} />
      </td>
    </tr>
  );

  return (
    <>
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
          {formData?.certificateList?.length > 0 ? (
            formData?.certificateList?.map((certificateItem, index) =>
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
    </>
  );
};

export default Certificate;

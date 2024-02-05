import React from 'react';

const Certificate = ({ formData, setFormData, handleItemChange }) => {
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

  const renderCertificateItem = (certificateItem, index) => (
    <tr key={certificateItem.id}>
      <td>
        <input
          name='certificate_name'
          type='text'
          placeholder='자격증명'
          value={certificateItem.certificate_name}
          onChange={(e) => handleItemChange(e, index, 'certificate')}
        />
      </td>
      <td>
        <input
          name='certificate_code'
          type='text'
          placeholder='자격증 코드'
          value={certificateItem.certificate_code}
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
        <button type='button' onClick={() => deleteCertificate(certificateItem.id)} />
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
    </>
  );
};

export default Certificate;

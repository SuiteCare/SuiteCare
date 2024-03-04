export const renderOptions = (options) => {
  return options?.map((option) => (
    <option key={option} value={option}>
      {option}
    </option>
  ));
};

export const renderCareerItem = (careerItem, index, handleItemChange, deleteCareer) => (
  <tr key={`career-${index}`}>
    <td>
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
    </td>
    <td>
      <input
        type='text'
        id='name'
        name='career_detail'
        placeholder='경력 세부내용'
        value={careerItem.name}
        onChange={(e) => handleItemChange(e, index, 'career')}
      />
    </td>
    <td>
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
    </td>
    <td>
      <button type='button' onClick={() => deleteCareer(careerItem.id)} />
    </td>
  </tr>
);

export const renderCertificateItem = (certificateItem, index, handleItemChange, deleteCertificate) => (
  <tr key={`certificate-${index}`}>
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

import React, { useEffect, useState, useRef } from 'react';
import {useQuery} from "react-query";
import axiosInstance from "@/services/axiosInstance";

const Certificate = ({ formData, setFormData, setChangedData, handleItemChange }) => {
  const [expireDateDisabledList, setExpireDateDisabledList] = useState();
  const [shownListId, setShownListId] = useState('');
  const [search, setSearch] = useState({id: ''});
  const [data, setData] = useState({
    certificates: [],
  });

  const {
    data: certificatesData,
    isCerError,
    isCerLoading,
  } = useQuery(
      ['certificates'],
      async () => {
        const {data} = await axiosInstance.get('/api/v1/certificateList');
        return data.result.map(e => e.종목명);
      }
  );

  useEffect(() => {
    setExpireDateDisabledList(
      formData?.certificateList ? formData.certificateList.map((e) => e.expired_date === '9999-12-31') : [],
    );
    setData({
      certificates: certificatesData || [],
    });
  }, [formData, certificatesData]);

  const addCertificate = () => {
    const lastCertificate = formData.certificateList[formData.certificateList.length - 1];
    const newCertificate = {
      orderId: (lastCertificate ? lastCertificate.orderId : 0) + 1,
      id: null,
      isDeleted: false,
    };
    setFormData((prevData) => {
      return { ...prevData, certificateList: [...(prevData.certificateList || []), newCertificate] };
    });
    setChangedData((prevData) => {
      return { ...prevData, certificateList: [...(prevData.certificateList || []), newCertificate] };
    });
    setExpireDateDisabledList((prevData) => {
      return [...prevData, false];
    });
  };

  const deleteCertificate = (orderId, index) => {
    setExpireDateDisabledList((prevData) => [...prevData.slice(0, index), ...prevData.slice(index)]);
    setFormData((prevData) => {
      return { ...prevData, certificateList: prevData.certificateList.filter((it) => it.orderId !== orderId) };
    });

    const deletedItem = formData.certificateList.filter((it) => it.orderId === orderId)[0];
    if (deletedItem.id) {
      setChangedData((prevData) => {
        return {
          ...prevData,
          certificateList: [...(prevData.certificateList || []), { ...deletedItem, isDeleted: true }],
        };
      });
    } else {
      setChangedData((prevData) => {
        return {
          ...prevData,
          certificateList: prevData.certificateList.filter((it) => it.orderId !== orderId),
        };
      });
    }
  };

  const handleClickNoExpire = (e, index) => {
    const { name, checked } = e.target;

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const today = `${year}-${month}-${day}`;

    const newCertificateList = formData?.certificateList;
    if (checked) {
      setExpireDateDisabledList(newCertificateList.map((item, i) => (i === index ? true : item)));
    } else {
      setExpireDateDisabledList(newCertificateList.map((item, i) => (i === index ? false : item)));
    }

    setFormData((prevData) => {
      const updatedData = { ...prevData };

      updatedData.certificateList = prevData.certificateList.map((certificateItem, i) =>
        i === index ? { ...certificateItem, [name]: `${checked ? '9999-12-31' : today}` } : certificateItem,
      );

      return updatedData;
    });

    setChangedData((prevData) => {
      const updatedData = { ...prevData };

      updatedData.certificateList = formData.certificateList.map((certificateItem, i) =>
        i === index ? { ...certificateItem, [name]: `${checked ? '9999-12-31' : today}` } : certificateItem,
      );

      return updatedData;
    });
  };
  const inputRefs = useRef([]);

  const certificateChange = (e, index, id) => {
    const { value } = e.currentTarget;
    setSearch(value);
    if(value !== '') {
      setShownListId(id);
    }

  }
  const onFocusOut = (e, index) => {
    const {value} = e.currentTarget;

    if(data.certificates.indexOf(value) === -1) {
      e.currentTarget.value = '';
    }
    setShownListId('');
    handleItemChange(e, index, 'certificate');
  }

  const onListClick = (e, item, index) => {
    if (inputRefs.current[index]) {
      inputRefs.current[index].value = item;
    }

    setShownListId('');
  };
  const handleMouseDown = (e) => e.preventDefault()


  const renderCertificateItem = (certificateItem, index) => (
    <tr key={certificateItem.orderId}>
      <td style={{position: 'relative'}}>
        <input
          id={certificateItem.id}
          name='name'
          type='text'
          placeholder='자격증명'
          defaultValue={certificateItem.name}
          onChange={(e) => {handleItemChange(e, index, 'certificate'), certificateChange(e, index, certificateItem.orderId)}}
          onBlur={(e) => onFocusOut(e, index)}
          ref={(el) => (inputRefs.current[index] = el)}
          style={{position: 'relative'}}
        />
        <ul hidden={shownListId !== certificateItem.orderId}>
          {data.certificates?.map((item, idx) => (
              <li
                  key={idx}
                  style={{ cursor: 'pointer'}}
                  hidden={!item.includes(search)}
                  onClick={(e) => onListClick(e, item, index)}
                  onMouseDown={handleMouseDown}
              >
                {item}
              </li>
          ))}
        </ul>
      </td>
      <td>
        <input
          name='code'
          type='text'
          placeholder='자격증 코드'
          defaultValue={certificateItem.code}
          onChange={(e) => handleItemChange(e, index, 'certificate')}
        />
      </td>
      <td>
        <input
          type='date'
          name='qualification_date'
          defaultValue={certificateItem.qualification_date}
          onChange={(e) => handleItemChange(e, index, 'certificate')}
        />
      </td>
      <td>
        <input
          type='date'
          name='expired_date'
          defaultValue={certificateItem.expired_date}
          onChange={(e) => handleItemChange(e, index, 'certificate')}
          disabled={expireDateDisabledList[index]}
          style={{ color: expireDateDisabledList[index] ? 'var(--very-light-gray)' : 'inherit' }}
        />
        <div className='checkbox_wrapper'>
          <input
            type='checkbox'
            name='expired_date'
            defaultChecked={certificateItem.expired_date === '9999-12-31'}
            onChange={(e) => handleClickNoExpire(e, index)}
          />
          <label htmlFor='expired_date'>없음</label>
        </div>
      </td>
      <td>
        <button type='button' onClick={() => deleteCertificate(certificateItem.orderId, index)} />
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

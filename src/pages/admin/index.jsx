import React, { useEffect, useState } from 'react';

import { minWage, getMinWage } from '@/utils/calculators';

const AdminPage = () => {
  const [minWageInfo, setMinWageInfo] = useState({});

  useEffect(() => {
    const getMinWageInfo = async () => {
      const obj = await getMinWage();
      setMinWageInfo(obj);
    };

    getMinWageInfo();
  }, []);
  return (
    <>
      <h2>최저시급 확인하기</h2>
      <table>
        <tr>
          <td>
            <label>
              {minWageInfo['연도']}년도 공시 {minWageInfo['순번'] === 1 ? '최저시급' : '오류 발생!'}
            </label>
          </td>
          <td>
            <span> {minWageInfo['시간급']}원</span>
          </td>
        </tr>
        <tr>
          <td>
            <label>현재 설정된 minWage </label>
          </td>
          <td>
            <span>{minWage}원</span>
          </td>
        </tr>
        <tr>
          <td colSpan={2}>{minWageInfo['시간급'] === minWage ? '문제 없음' : 'minWage 변수 값 변경 필요'}</td>
        </tr>
      </table>
    </>
  );
};

export default AdminPage;

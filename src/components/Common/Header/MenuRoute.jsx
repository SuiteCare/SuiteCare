import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import axiosInstance from '@/services/axiosInstance';

import logout from '@/utils/logout';

const MenuRoute = ({ type }) => {
  const navigator = useRouter();

  const updateRole = async ($target) => {
    const response = await axiosInstance.patch('/api/v1/member', { role: 'A' });
    if (response?.data) {
      alert('통합회원 전환이 완료되었습니다. 다시 로그인하세요.');
      logout();
      navigator.push(`/${$target}/login`);
    } else {
      alert('통합회원 전환에 실패하였습니다.');
      navigator.back();
    }
  };

  const checkRole = (loginInfo) => {
    const { role } = loginInfo;
    const destination = window.location.pathname.split('/')[1];
    if (destination === 'mate' && role === 'F') {
      if (confirm('메이트-패밀리 통합 회원으로 전환하시겠습니까?')) {
        updateRole('mate', 'A');
      } else {
        alert('패밀리 회원은 메이트 메뉴에 접근할 수 없습니다.');
        navigator.back();
      }
    } else if (destination === 'family' && role === 'M') {
      if (confirm('패밀리-메이트 통합 회원으로 전환하시겠습니까?')) {
        updateRole('family', 'A');
      } else {
        alert('메이트 회원은 패밀리 메뉴에 접근할 수 없습니다.');
        navigator.back();
      }
    }
  };

  useEffect(() => {
    const checkLogin = async () => {
      if (typeof window !== 'undefined') {
        const loginInfo = localStorage.getItem('login_info');
        const accessToken = localStorage.getItem('access_token');
        const expirationTime = localStorage.getItem('expiration_time');

        if (accessToken && JSON.parse(loginInfo)?.login_id && expirationTime >= new Date().getTime()) {
          try {
            const response = await axiosInstance.get('/api/v1/mypage', {
              params: { id: JSON.parse(loginInfo).login_id },
            });
            if (response) {
              checkRole(JSON.parse(loginInfo));
              console.log('ok');
            }
          } catch (error) {
            console.error(error);
          }
        } else {
          alert('로그인이 필요합니다.');
          logout();
          navigator.push(`/${type}/login`);
        }
      }
    };

    checkLogin();
  }, [type]);
};

export default MenuRoute;

import axios from 'axios';

import logout from '@/utils/logout';

const localServer = 'http://localhost:3000'; // 로컬 서버
const productServer = ''; // 실제 백엔드 서버

const axiosInstance = axios.create({
  baseURL: localServer,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const retryDelay = 1000; // 1초

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // axios api를 요청했을 때, interceptor를 통해서 요청하기 전 로직을 구현하는 곳입니다.
    // jwt로 발급한 token을 가져오는 로직을 여기에 구현하면 됩니다.
    // 참고 자료: https://velog.io/@xmun74/axios-interceptors-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0

    // console.log('Starting Request', config);
    const accessToken = localStorage.getItem('access_token');
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    // 요청 상태 코드 200이 아닌 경우
    console.error('Request Error:', error);
    return Promise.reject(error);
  },
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    if (response.headers.authorization) {
      const newAccessToken = response.headers.authorization;
      localStorage.removeItem('access_token');
      localStorage.setItem('access_token', newAccessToken);
      response.config.headers = {
        authorization: `${newAccessToken}`,
      };
    }
    return response;
  },
  (error) => {
    const { config, response } = error;

    // if (response && response.status === 403) {
    // 403 에러가 발생하면 로그인 정보를 지우고 로그인 페이지로 이동시킴
    // 개발 완료 이후에는 무조건 로그아웃 처리가 되도록 if 문 제거
    //  if (window.confirm('403 에러 발생. 로그아웃하시겠습니까?')) {
    //    logout();
    //    window.location.href = `/${window.location.pathname.split('/')[1]}/login`;
    //   }
    //  }

    if (response && response.status >= 500 && response.status < 600) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(axiosInstance(config)), retryDelay);
      });
    }
    throw error;
  },
);

export default axiosInstance;

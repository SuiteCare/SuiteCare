import axios from 'axios';

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
    console.error('Request Error, 요청 에러', error);
    return Promise.reject(error);
  },
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // 응답 로직
    // console.log('Response:', response);

    if (response.headers.authorization) {
      const newAccessToken = response?.headers?.authorization;
      localStorage.removeItem('access_token'); // 만료된 access토큰 삭제
      localStorage.setItem('access_token', newAccessToken); // 새걸로 교체
      response.config.headers = {
        authorization: `${newAccessToken}`,
      };
    }

    return response;
  },
  (error) => {
    const { config, response } = error;

    // 에러 상태 코드가 재시도할만한 상태인 경우
    if (response && response.status >= 500 && response.status < 600) {
      // 딜레이 후 재시도
      return new Promise((resolve) => {
        setTimeout(() => resolve(axiosInstance(config)), retryDelay);
      });
    } else {
        throw error;
    }
  },
);

export default axiosInstance;

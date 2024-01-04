// ID 체크
export const idRegex = (id) => {
  return id && id?.replace(/^[a-z0-9_]{6,20}$/);
};

// 한글 이름 1~6 체크
export const krNameRegex = (name) => {
  return name && name?.replace(/^[가-힣]{1,6}$/);
};

// 한글 성 1~3글자 제한 regex 체크
export const lastNameRegex = (name) => {
  return name && name?.replace(/^[가-힣]{1,3}$/);
};

// email형식 체크
export const emailRegex = (email) => {
  return (
    email &&
    email?.replace(
      /(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/,
    )
  );
};

// 비밀번호 영어소문자+숫자+글자수(6글자 이상, 20글자 이하) 체크
export const passwordRegex = (password) => {
  return password && password?.replace(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\w\W]{8,20}$/);
};

// 비밀번호 영어 대소문자+숫자+글자수(6글자 이상, 12글자 이하) 체크
export const validatePassword = (password) => {
  const passwordCheck = /^[a-zA-Z0-9]{6,12}$/;
  return passwordCheck.test(password);
};

// 비밀번호 일치 확인
export const passwordConfirmRegex = (password, passwordConfirm) => {
  return password === passwordConfirm;
};

// 휴대폰번호 형식 체크
// /^\d{3}-\d{3,4}-\d{4}$/ : 010-1234-5678
// /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?([0-9]{3,4})-?([0-9]{4})$/ : 010-1234-5678, 01012345678, 010 1234 5678
export const phoneRegex = (phone) => {
  return phone && phone?.replace(/^\d{3}-\d{3,4}-\d{4}$/);
};

// 숫자만 입력받기
export const onlyNumberRegex = (value) => {
  return value && value.replace(/[^0-9]/g, '');
};

// 휴대폰번호 하이폰(-) 정규식
export const phoneHyphenRegex = (phone) => {
  return (
    phone &&
    phone
      ?.replace(/[^0-9]/g, '')
      ?.replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
      ?.replace(/(\\-{1,2})$/g, '')
  );
};

// 일반 전화번호 하이폰(-) 정규식
export const telHyphenRegex = (tel) => {
  return (
    tel &&
    tel
      ?.replace(/[^0-9]/g, '')
      ?.replace(/^(\d{0,2})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
      ?.replace(/(\\-{1,2})$/g, '')
  );
};

// 지역, 대표, 휴대폰 번호 정규식
export const hyphenReg = (num) => {
  return (
    num &&
    num
      ?.replace(/[^0-9]/g, '')
      ?.replace(/^(02|0[3-6]{1}[1-5]{1})([0-9]{3,4})([0-9]{4})$/, '$1-$2-$3')
      ?.replace(/^(02|0[3-6]{1}[1-5]{1})(15|16|18)[0-9]{2}([0-9]{4})$/, '$1-$2-$3')
      ?.replace(/^(1[0-9]{3})([0-9]{4})$/, '$1-$2')
      ?.replace(/^(070|050[2-8]{0,1}|080|013)([0-9]{3,4})([0-9]{4})$/, '$1-$2-$3')
      ?.replace(/^(01[016789]{1})([0-9]{3,4})([0-9]{4})$/, '$1-$2-$3')
      ?.replace(/(\\-{1,2})$/g, '')
  );
};

// 사업자 등록 번호 하이폰(-) 정규식
export const businessNumberHyphenRegex = (number) => {
  return (
    number &&
    number
      ?.replace(/[^0-9]/g, '')
      ?.replace(/^(\d{0,3})(\d{0,2})(\d{0,5})$/g, '$1-$2-$3')
      ?.replace(/(\\-{1,2})$/g, '')
  );
};

// 숫자 1000단위 콤마 찍기 함수
export const numberWithCommas = (number) => {
  return number && number.toString().replace(/(\..*)$|(\d)(?=(\d{3})+(?!\d))/g, (digit, fract) => fract || `${digit},`);
};

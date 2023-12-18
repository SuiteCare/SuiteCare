const formInputInfos = {
  id: {
    label: '아이디',
    type: 'text',
    name: 'id',
    id: 'id',
    maxLength: 20,
  },
  pw: {
    label: '비밀번호',
    type: 'password',
    name: 'pw',
    id: 'pw',
    maxLength: 20,
  },
  pw_check: {
    label: '비밀번호 확인',
    type: 'password',
    name: null,
    id: 'pw_check',
    maxLength: 20,
  },
  user_name: {
    label: '성함',
    type: 'text',
    name: 'user_name',
    id: 'user_name',
    maxLength: 15,
  },
  phone_authentication: {
    label: null,
    type: 'hidden',
    name: null,
    id: 'phone_authentication',
    maxLength: 5,
  },
  birth: {
    label: null,
    type: 'hidden',
    name: null,
    id: 'birth',
    maxLength: null,
  },
};

export default formInputInfos;

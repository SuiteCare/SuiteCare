const formInputInfos = {
  id: {
    label: '아이디',
    type: 'text',
    name: 'id',
    id: 'id',
    maxLength: 20,
  },
  password: {
    label: '비밀번호',
    type: 'password',
    name: 'password',
    id: 'password',
    maxLength: 20,
  },
  pw_check: {
    label: '비밀번호 확인',
    type: 'password',
    id: 'pw_check',
    maxLength: 20,
  },
  name: {
    label: '성명',
    type: 'text',
    name: 'name',
    id: 'name',
    maxLength: 15,
  },
  tel: {
    label: '휴대전화',
    type: 'text',
    name: 'tel',
    id: 'tel',
    maxLength: 13,
    placeholder: '010-0000-0000',
  },
  email: {
    label: '이메일',
    type: 'text',
    name: 'email',
    id: 'email',
    placeholder: 'xxx@xxxx.xxx',
  },
  birthday: {
    label: '생년월일',
    type: 'date',
    name: 'birthday',
    id: 'birthday',
  },
};

export default formInputInfos;

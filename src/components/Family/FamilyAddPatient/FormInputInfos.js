const formInputInfos = {
  name: {
    label: '성함',
    type: 'text',
    id: 'user_name',
    maxLength: 15,
  },
  birth: {
    label: '생년월일',
    type: 'date',
    id: 'birth',
    maxLength: 20,
  },
  gender: {
    label: '성별',
    type: 'radio',
    options: [
      { value: 'M', label: '남자' },
      { value: 'F', label: '여자' },
    ],
  },
  height: {
    label: '키 (cm)',
    type: 'number',
    id: 'height',
    maxLength: 3,
  },
  weight: {
    label: '몸무게 (kg)',
    type: 'number',
    id: 'weight',
    maxLength: 3,
  },
  diagnosis: {
    label: '진단명',
    type: 'text',
    id: 'diagnosis',
    maxLength: 45,
  },
  consciousness_state: {
    label: '의식 상태',
    type: 'radio',
    id: 'consciousness_state',
    maxLength: 45,
    options: [
      { value: '1', label: '의식 있음' },
      { value: '2', label: '의식은 있으나 의사소통 어려움' },
      { value: '0', label: '의식 없음' },
    ],
  },
  care_meal_yn: {
    label: '식사 보조',
    type: 'radio',
    options: [
      { value: '1', label: '필요함' },
      { value: '2', label: '경관영양 (피딩)' },
      { value: '3', label: '주사를 통한 정맥영양' },
      { value: '0', label: '스스로 식사 가능' },
    ],
  },
  care_toilet_yn: {
    label: '용변 보조',
    type: 'radio',
    options: [
      { value: '1', label: '화장실 동행 필요' },
      { value: '2', label: '기저귀' },
      { value: '3', label: '소변줄' },
      { value: '4', label: '장루/요루' },
      { value: '0', label: '스스로 화장실 이용' },
    ],
  },
  paralysis_state: {
    label: '마비 상태',
    type: 'radio',
    id: 'paralysis_state',
    maxLength: 45,
    options: [
      { value: '1', label: '전신마비' },
      { value: '2', label: '편마비' },
      { value: '0', label: '없음' },
    ],
  },
  mobility_state: {
    label: '거동 상태',
    type: 'radio',
    id: 'mobility_state',
    maxLength: 45,
    options: [
      { value: '1', label: '움직일 수 없음' },
      { value: '2', label: '지팡이 혹은 휠체어 보조 필요' },
      { value: '3', label: '침대에서만 거동 가능' },
      { value: '0', label: '스스로 걸을 수 있음' },
    ],
  },

  bedsore_yn: {
    label: '욕창 유무',
    type: 'radio',
    options: [
      { value: '1', label: '있음' },
      { value: '0', label: '없음' },
    ],
  },
  suction_yn: {
    label: '석션 필요',
    type: 'radio',
    options: [
      { value: '1', label: '예' },
      { value: '0', label: '아니오' },
    ],
  },
  outpatient_yn: {
    label: '동행 외출 필요',
    type: 'radio',
    options: [
      { value: '1', label: '예' },
      { value: '0', label: '아니오' },
    ],
  },
  night_care_yn: {
    label: '야간 간병 필요',
    type: 'radio',
    options: [
      { value: '1', label: '예' },
      { value: '0', label: '아니오' },
    ],
  },
  notice: {
    label: '비고',
    type: 'text',
    id: 'notice',
    maxLength: 200,
  },
};

export default formInputInfos;

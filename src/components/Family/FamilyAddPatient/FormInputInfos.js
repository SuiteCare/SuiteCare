const formInputInfos = {
  name: {
    label: '성함',
    type: 'text',
    id: 'user_name',
    maxLength: 15,
    basic: true,
  },
  birthday: {
    label: '생년월일',
    type: 'date',
    id: 'birthday',
    maxLength: 20,
    basic: true,
  },
  gender: {
    label: '성별',
    type: 'radio',
    options: [
      { value: 'M', label: '남자' },
      { value: 'F', label: '여자' },
    ],
    basic: true,
  },
  height: {
    label: '키 (cm)',
    type: 'number',
    id: 'height',
    maxLength: 3,
    basic: true,
  },
  weight: {
    label: '몸무게 (kg)',
    type: 'number',
    id: 'weight',
    maxLength: 3,
    basic: true,
  },
  diagnosis_name: {
    label: '진단명',
    type: 'text',
    id: 'diagnosis_name',
    maxLength: 45,
    basic: true,
  },
  consciousness_state: {
    label: '의식 상태',
    type: 'radio',
    id: 'consciousness_state',
    maxLength: 45,
    options: [
      { value: '의식 있음', label: '의식 있음' },
      { value: '의식은 있으나 의사소통 어려움', label: '의식은 있으나 의사소통 어려움' },
      { value: '의식 없음', label: '의식 없음' },
    ],
  },
  meal_care_state: {
    label: '식사 보조',
    type: 'radio',
    options: [
      { value: '필요함', label: '필요함' },
      { value: '경관영양 (피딩)', label: '경관영양 (피딩)' },
      { value: '주사를 통한 정맥영양', label: '주사를 통한 정맥영양' },
      { value: '스스로 식사 가능', label: '스스로 식사 가능' },
    ],
  },
  toilet_care_state: {
    label: '용변 보조',
    type: 'radio',
    options: [
      { value: '화장실 동행 필요', label: '화장실 동행 필요' },
      { value: '기저귀', label: '기저귀' },
      { value: '소변줄', label: '소변줄' },
      { value: '장루/요루', label: '장루/요루' },
      { value: '스스로 화장실 이용', label: '스스로 화장실 이용' },
    ],
  },
  paralysis_state: {
    label: '마비 상태',
    type: 'radio',
    id: 'paralysis_state',
    maxLength: 45,
    options: [
      { value: '전신마비', label: '전신마비' },
      { value: '편마비', label: '편마비' },
      { value: '없음', label: '없음' },
    ],
  },
  behavioral_state: {
    label: '거동 상태',
    type: 'radio',
    id: 'behavioral_state',
    maxLength: 45,
    options: [
      { value: '움직일 수 없음', label: '움직일 수 없음' },
      { value: '지팡이 혹은 휠체어 보조 필요', label: '지팡이 혹은 휠체어 보조 필요' },
      { value: '침대에서만 거동 가능', label: '침대에서만 거동 가능' },
      { value: '스스로 걸을 수 있음', label: '스스로 걸을 수 있음' },
    ],
  },
  is_bedsore: {
    label: '욕창 유무',
    type: 'radio',
    options: [
      { value: 'Y', label: '있음' },
      { value: 'N', label: '없음' },
    ],
  },
  need_suction: {
    label: '석션 필요',
    type: 'radio',
    options: [
      { value: 'Y', label: '있음' },
      { value: 'N', label: '없음' },
    ],
  },
  need_outpatient: {
    label: '주기적 외래 진료',
    type: 'radio',
    options: [
      { value: 'Y', label: '있음' },
      { value: 'N', label: '없음' },
    ],
  },
  need_night_care: {
    label: '야간 간병 필요',
    type: 'radio',
    options: [
      { value: 'Y', label: '있음' },
      { value: 'N', label: '없음' },
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

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
      { value: '남자', label: '남자' },
      { value: '여자', label: '여자' },
    ],
  },
  height: {
    label: '키 (cm)',
    type: 'text',
    id: 'height',
    maxLength: 20,
  },
  weight: {
    label: '몸무게(kg)',
    type: 'text',
    id: 'weight',
    maxLength: 20,
  },
  diagnosis: {
    label: '진단명',
    type: 'text',
    id: 'diagnosis',
    maxLength: 45,
  },
  consciousness_state: {
    label: '의식상태',
    type: 'text',
    id: 'consciousness_state',
    maxLength: 45,
  },
  paralysis_state: {
    label: '마비상태',
    type: 'text',
    id: 'paralysis_state',
    maxLength: 45,
  },
  mobility_state: {
    label: '이동가능상태?!',
    type: 'text',
    id: 'mobility_state',
    maxLength: 45,
  },
  notice: {
    label: '추가사항',
    type: 'textarea',
    id: 'notice',
    maxLength: 200,
  },
  care_meal_yn: {
    label: '식사보조필요',
    type: 'radio',
    options: [
      { value: 'Y', label: '네' },
      { value: 'N', label: '아니요' },
    ],
  },
  care_toilet_yn: {
    label: '화장실 동행 필요',
    type: 'radio',
    options: [
      { value: 'Y', label: '네' },
      { value: 'N', label: '아니요' },
    ],
  },
  bedsore_yn: {
    label: '욕창 유무',
    type: 'radio',
    options: [
      { value: 'Y', label: '네' },
      { value: 'N', label: '아니요' },
    ],
  },
  suction_yn: {
    label: '석션 필요',
    type: 'radio',
    options: [
      { value: 'Y', label: '네' },
      { value: 'N', label: '아니요' },
    ],
  },
  outpatient_yn: {
    label: '동행 외출 필요',
    type: 'radio',
    options: [
      { value: 'Y', label: '네' },
      { value: 'N', label: '아니요' },
    ],
  },
  bedsornight_care_yne_yn: {
    label: '야간 간병',
    type: 'radio',
    options: [
      { value: 'Y', label: '네' },
      { value: 'N', label: '아니요' },
    ],
  },
};

export default formInputInfos;

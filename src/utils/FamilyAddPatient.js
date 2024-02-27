import formInputInfos from '@/components/Family/FamilyAddPatient/FormInputInfos';

const random = (e, formData, setFormData) => {
  if (e.key === '`') {
    const randomData = { ...formData };

    const names = [
      '김',
      '이',
      '박',
      '최',
      '정',
      '강',
      '조',
      '윤',
      '장',
      '임',
      '한',
      '오',
      '서',
      '신',
      '권',
      '황',
      '안',
      '송',
      '전',
      '홍',
      '문',
      '손',
      '양',
      '배',
      '백',
      '허',
      '남',
      '심',
      '노',
      '하',
      '곽',
      '성',
      '차',
      '주',
      '우',
      '구',
      '나',
      '민',
      '유',
      '류',
      '진',
      '엄',
      '채',
      '원',
      '천',
      '방',
      '공',
      '현',
      '함',
      '변',
      '염',
      '여',
      '추',
      '도',
      '소',
      '석',
      '마',
      '가',
    ];

    const randomName = names[Math.floor(Math.random() * names.length)];
    randomData.name = `${randomName}환자`;

    const randomHeight = Math.floor(Math.random() * 71) + 130;
    randomData.height = randomHeight.toString();

    const randomWeight = Math.floor(Math.random() * 81) + 40;
    randomData.weight = randomWeight.toString();

    const diagnoses = ['진단명1', '진단명2', '진단명3'];
    const randomDiagnosis = diagnoses[Math.floor(Math.random() * diagnoses.length)];
    randomData.diagnosis_name = randomDiagnosis;

    const randomYear = Math.floor(Math.random() * 80) + 1924;
    const randomMonth = Math.floor(Math.random() * 12) + 1;
    const randomDay = Math.floor(Math.random() * 31) + 1;
    randomData.birthday = `${randomYear}-${String(randomMonth).padStart(2, '0')}-${String(randomDay).padStart(2, '0')}`;

    for (const key in randomData) {
      if (formInputInfos[key].type === 'radio') {
        const radioOptions = formInputInfos[key].options;
        const randomOption = radioOptions[Math.floor(Math.random() * radioOptions.length)].value;
        randomData[key] = randomOption;
      }
    }

    setFormData(randomData);
  }
};

export default random;


const elemAmountOfSubstance = document.getElementById('amount-of-substance');
const elemConcentration = document.getElementById('concentration');
const elemMass = document.getElementById('mass');
const elemVolume = document.getElementById('volume');

const elemConcentrationAmountType = document.getElementById('concentration-amount-type');
const elemConcentrationVolumeType = document.getElementById('concentration-volume-type');
const elemMassType = document.getElementById('mass-type');
const elemVolumeType = document.getElementById('volume-type');

const getAmountOfSubstance = () => {
  let amountOfSubstance = Number(elemAmountOfSubstance.value);

  return amountOfSubstance;
}

const getConcentration = () => {
  let concentration = Number(elemConcentration.value);

  switch (elemConcentrationAmountType.value) {
    case 'mol':
      break;
    case 'mmol':
      concentration /= 1000;
      break;
    default:
      throw new Error('物质的量浓度单位错误');
  }
  switch (elemConcentrationVolumeType.value) {
    case 'l':
      break;
    case 'ml':
      concentration *= 1000;
      break;
    case 'ul':
      concentration *= 1000 * 1000;
      break;
    default:
      throw new Error('物质的量浓度单位错误');
  }

  return concentration;
}

const getMass = () => {
  let mass = Number(elemMass.value);

  switch (elemMassType.value) {
    case 'kg':
      mass *= 1000;
    case 'g':
      break;
    case 'mg':
      mass /= 1000;
      break;
    case 'ug':
      mass /= 1000 * 1000;
      break;
    default:
      throw new Error('质量单位错误');
  }

  return mass;
}

const getVolume = () => {
  let volume = Number(elemVolume.value);

  switch (elemVolumeType.value) {
    case 'l':
      break;
    case 'ml':
      volume /= 1000;
      break;
    case 'ul':
      volume /= 1000 * 1000;
      break;
    default:
      throw new Error('体积单位错误');
  }

  return volume;
}

const setAmountOfSubstance = (amountOfSubstance) => {
  elemAmountOfSubstance.value = (amountOfSubstance || 0).toFixed(4);
}

const setConcentration = (concentration) => {
  switch (elemConcentrationAmountType.value) {
    case 'mol':
      break;
    case 'mmol':
      concentration *= 1000;
      break;
    default:
      throw new Error('物质的量浓度单位错误');
  }
  switch (elemConcentrationVolumeType.value) {
    case 'l':
      break;
    case 'ml':
      concentration /= 1000;
      break;
    case 'ul':
      concentration /= 1000 * 1000;
      break;
    default:
      throw new Error('物质的量浓度单位错误');
  }

  elemConcentration.value = (concentration || 0).toFixed(4);
}

const setMass = (mass) => {
  switch (elemMassType.value) {
    case 'kg':
      mass /= 1000;
    case 'g':
      break;
    case 'mg':
      mass *= 1000;
      break;
    case 'ug':
      mass *= 1000 * 1000;
      break;
    default:
      throw new Error('质量单位错误');
  }

  elemMass.value = (mass || 0).toFixed(4);
}

const setVolume = (volume) => {
  switch (elemVolumeType.value) {
    case 'l':
      break;
    case 'ml':
      volume *= 1000;
      break;
    case 'ul':
      volume *= 1000 * 1000;
      break;
    default:
      throw new Error('浓度单位错误');
  }

  elemVolume.value = (volume || 0).toFixed(4);
}

const calculateAmountOfSubstance = () => {
  const concentration = getConcentration();
  const mass = getMass();
  const volume = getVolume();

  const amountOfSubstance = mass / concentration / volume;

  setAmountOfSubstance(amountOfSubstance);
}

const calculateConcentration = () => {
  const amountOfSubstance = getAmountOfSubstance();
  const mass = getMass();
  const volume = getVolume();

  const concentration = mass / amountOfSubstance / volume;

  setConcentration(concentration);
}

const calculateMass = () => {
  const amountOfSubstance = getAmountOfSubstance();
  const concentration = getConcentration();
  const volume = getVolume();

  const mass = amountOfSubstance * concentration * volume;

  setMass(mass);
}

const calculateVolume = () => {
  const amountOfSubstance = getAmountOfSubstance();
  const concentration = getConcentration();
  const mass = getMass();

  const volume = mass / concentration / amountOfSubstance;

  setVolume(volume);
}

const getCalculationField = () => {
  const fields = [
    { elem: elemAmountOfSubstance, handler: calculateAmountOfSubstance },
    { elem: elemConcentration, handler: calculateConcentration },
    { elem: elemMass, handler: calculateMass },
    { elem: elemVolume, handler: calculateVolume },
  ];
  let emptyHandler = '';
  let emptyNum = 0;

  for (let field of fields) {
    if (field.elem.value === '') {
      emptyHandler = field.handler;
      emptyNum++;
    }
  }

  if (emptyNum > 1) {
    throw new Error('需要计算的值不能大于一个');
  }

  return emptyHandler || calculateMass;
}

const calculate = () => {
  try {
    const handler = getCalculationField();

    if (!handler) {
      throw new Error('无效的处理器');
    }

    handler();
  } catch (err) {
    alert(err);
    throw err;
  }
}

const reset = () => {
  elemAmountOfSubstance.value = "";
  elemConcentration.value = "";
  elemMass.value = "";
  elemVolume.value = "";
}

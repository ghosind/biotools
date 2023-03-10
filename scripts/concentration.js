
const elemAmountOfSubstance = document.getElementById('amount-of-substance');
const elemConcentration = document.getElementById('concentration');
const elemMassConcentration = document.getElementById('mass-concentration');

const elemConcentrationAmountType = document.getElementById('concentration-amount-type');
const elemConcentrationVolumeType = document.getElementById('concentration-volume-type');

const elemMassConcentrationMassType = document.getElementById('mass-concentration-mass-type');
const elemMassConcentrationVolumeType = document.getElementById('mass-concentration-volume-type');

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

const getMassConcentration = () => {
  let massConcentration = Number(elemMassConcentration.value);

  switch (elemMassConcentrationMassType.value) {
    case 'kg':
      massConcentration *= 1000;
    case 'g':
      break;
    case 'mg':
      massConcentration /= 1000;
      break;
    case 'ug':
      massConcentration /= 1000 * 1000;
      break;
    default:
      throw new Error('浓度单位错误');
  }
  switch (elemMassConcentrationVolumeType.value) {
    case 'l':
      break;
    case 'ml':
      massConcentration *= 1000;
      break;
    case 'ul':
      massConcentration *= 1000 * 1000;
      break;
    default:
      throw new Error('浓度单位错误');
  }

  return massConcentration;
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

  elemConcentration.value = concentration.toFixed(4);
}

const setMassConcentration = (massConcentration) => {
  switch (elemMassConcentrationMassType.value) {
    case 'kg':
      massConcentration /= 1000;
      break;
    case 'g':
      break;
    case 'mg':
      massConcentration *= 1000;
      break;
    case 'ug':
      massConcentration *= 1000 * 1000;
      break;
    default:
      throw new Error('浓度单位错误');
  }
  switch (elemMassConcentrationVolumeType.value) {
    case 'l':
      break;
    case 'ml':
      massConcentration /= 1000;
      break;
    case 'ul':
      massConcentration /= 1000 * 1000;
      break;
    default:
      throw new Error('浓度单位错误');
  }

  elemMassConcentration.value = massConcentration.toFixed(4);
}

const calculate = () => {
  try {
    if (!elemAmountOfSubstance.value) {
      throw new Error('物质的量必须填写');
    }

    const amountOfSubstance = Number(elemAmountOfSubstance.value);

    if (!elemConcentration.value && !elemMassConcentration.value) {
      throw new Error('浓度或物质的量浓度其中必须填写一个');
    }

    if (!elemConcentration.value) {
      const massConcentration = getMassConcentration();

      const concentration = massConcentration / amountOfSubstance;

      setConcentration(concentration);
    } else {
      const concentration = getConcentration();

      const massConcentration = concentration * amountOfSubstance;

      setMassConcentration(massConcentration);
    }
  } catch (err) {
    alert(err);
    throw err;
  }
}

const reset = () => {
  elemAmountOfSubstance.value = "";
  elemConcentration.value = "";
  elemMassConcentration.value = "";
}

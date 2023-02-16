const arrayInput = document.querySelector('#array-input');
const arrayOutput = document.querySelector('#array-output');
const averageOutput = document.querySelector('#average-output');
const medianOutput = document.querySelector('#median-output');
const anyArrayInput = document.querySelector('#any-array-input');
const anyArrayOutput = document.querySelector('#any-array-output');
const modeOutput = document.querySelector('#mode-output');
const rmsArrayInput = document.querySelector('#rms-array-input');
const rmsArrayOutput = document.querySelector('#rms-array-output');
const rmsOutput = document.querySelector('#rms-output');

function calculateFirstSection() {
  const arrayToCalculate = arrayInput.value.split(' ').map((item) => Number(item));
  const outputArray = arrayInput.value.split(' ').map((item) => " " + Number(item));
  arrayOutput.innerText = '[' + outputArray + ' ]';
  averageOutput.innerText = calculateAverage(arrayToCalculate);
  medianOutput.innerText = calculateMedian(arrayToCalculate);
}

function calculateSecondSection() {
  const arrayToCalculate = anyArrayInput.value.split(' ').map((item) => item);
  const outputArray = anyArrayInput.value.split(' ').map((item) => " " + item);
  anyArrayOutput.innerText = '[' + outputArray + ' ]';
  modeOutput.innerText = calculateMode(arrayToCalculate);
}

function calculateThirdSection() {
  const arrayToCalculate = rmsArrayInput.value.split(' ').map((item) => Number(item));
  const outputArray = rmsArrayInput.value.split(' ').map((item) => " " + Number(item));
  rmsArrayOutput.innerText = '[' + outputArray + ' ]';
  rmsOutput.innerText = calculateRMS(arrayToCalculate);
}

function isPair(list) {
  if (list.length % 2 == 0) {
    return true;
  }
  else {
    return false;
  }
}

function sortList(unsortList) {
  const sortedList = unsortList.sort((accValue, newValue) => accValue - newValue);
  return sortedList;
}

function sortBidimensionalList(arrayList) {
  const sortedBiList = arrayList.sort((accValue, newValue) =>  newValue[1] - accValue[1]);
  return sortedBiList;
}

function calculateAverage(list) {
  const accList = list.reduce((a,b) => a + b);
  return accList / list.length;
}

function calculateMedian(unsortedList) {
  const list = sortList(unsortedList);
  const listIsPair = isPair(list);
  const indexMiddleListImpair = Math.floor(list.length / 2);
  let median;
  if (listIsPair) {
    median = calculateAverage([
      list[indexMiddleListImpair],  
      list[indexMiddleListImpair - 1]
    ]);
  }
  else {
    median = list[indexMiddleListImpair];
  }
  return median;
}

function calculateMode(list) {
  const countList = {};

  for (let i = 0; i < list.length; i++) {
    const element = list[i];

    if (countList[element]) {
      countList[element] += 1;
    }
    else {
      countList[element] = 1;
    }
  }

  const listArray = Object.entries(countList);
  const listArraySorted = sortBidimensionalList(listArray);

  return listArraySorted[0][0];
}

function calculateRMS(list) {
  list = list.map((item) => Math.pow(item, 2));
  const accList = list.reduce((a, b) => a + b);
  return Math.sqrt(accList / list.length);
}

arrayInput.addEventListener('input', calculateFirstSection);
arrayInput.addEventListener('input', calculateFirstSection);
anyArrayInput.addEventListener('input', calculateSecondSection);
rmsArrayInput.addEventListener('input', calculateThirdSection);
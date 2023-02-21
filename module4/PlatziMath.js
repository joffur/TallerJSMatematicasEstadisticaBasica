const PlatziMath = {};

PlatziMath.isPair = function isPair(list) {
  if (list.length % 2 == 0) {
    return true;
  }
  else {
    return false;
  }
}

PlatziMath.sortList = function sortList(unsortList) {
  const sortedList = unsortList.sort((accValue, newValue) => accValue - newValue);
  return sortedList;
}

PlatziMath.sortBidimensionalList = function sortBidimensionalList(arrayList) {
  const sortedBiList = arrayList.sort((accValue, newValue) =>  newValue[1] - accValue[1]);
  return sortedBiList;
}

PlatziMath.calculateAverage = function calculateAverage(list) {
  const accList = list.reduce((a,b) => a + b);
  return parseFloat(Number.parseFloat(accList / list.length).toFixed(3));
}

PlatziMath.calculateMedian = function calculateMedian(unsortedList) {
  const list = this.sortList(unsortedList);
  const listIsPair = this.isPair(list);
  const indexMiddleListImpair = Math.floor(list.length / 2);
  let median;
  if (listIsPair) {
    median = this.calculateAverage([
      list[indexMiddleListImpair],  
      list[indexMiddleListImpair - 1]
    ]);
  }
  else {
    median = list[indexMiddleListImpair];
  }
  return parseFloat(Number.parseFloat(median).toFixed(3));
}

PlatziMath.calculateMode = function calculateMode(list) {
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
  const listArraySorted = this.sortBidimensionalList(listArray);

  return listArraySorted[0][0];
}

PlatziMath.calculateRMS = function calculateRMS(list) {
  list = list.map((item) => Math.pow(item, 2));
  const accList = list.reduce((a, b) => a + b);
  return parseFloat(Number.parseFloat(Math.sqrt(accList / list.length)).toFixed(3));
}
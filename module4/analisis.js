const empresas = {};

for (const persona of salarios) {
  for (const trabajo of persona.trabajos) {
    if (!empresas[trabajo.empresa]) {
      empresas[trabajo.empresa] = {};
    }
    
    if (!empresas[trabajo.empresa][trabajo.year]) {
      empresas[trabajo.empresa][trabajo.year] = [];
    }

    empresas[trabajo.empresa][trabajo.year].push(trabajo.salario);
  }
}

console.log({empresas});

function findPerson(personInSearch) {
  return salarios.find(person => person.name == personInSearch);
}

function medianPerPerson(namePerson) {
  const works = findPerson(namePerson).trabajos;
  const salaries = works.map((element) => {
    return element.salario;
  });
  const media = PlatziMath.calculateMedian(salaries);
  return media;
}

function personProjection(namePerson) {
  const works = findPerson(namePerson).trabajos;

  let growthPercentages = [];

  for (let i = 1; i < works.length; i++) {
    const actualSalary = works[i].salario;
    const lastSalary = works[i - 1].salario;
    const growth = actualSalary - lastSalary;
    const growthPercentage = growth / lastSalary;
    growthPercentages.push(growthPercentage);
  }
  const growthPercentagesMedian = PlatziMath.calculateMedian(growthPercentages);

  
  const lastSalary = works[works.length - 1].salario;
  const newSalary = lastSalary * (1 + growthPercentagesMedian);

  return newSalary;
}

function medianEnterprise(nameEnterprise, searchYear) {
  if (!empresas[nameEnterprise]) {
    console.warn('La empresa buscada no existe');
    return;
  }
  else if (!empresas[nameEnterprise][searchYear]) {
    console.warn('La empresa no dió salarios ese año');
    return;
  }
  else {
    return PlatziMath.calculateMedian(empresas[nameEnterprise][searchYear]);
  }
}

function enterpriseProjection(nameEnterprise) {
  if (!empresas[nameEnterprise]) {
    console.warn('La empresa buscada no existe');
  }
  else {
    const enterpriseYears = Object.keys(empresas[nameEnterprise]);
    const listMedianYears = enterpriseYears.map((year) => {
      return medianEnterprise(nameEnterprise, year)
    })

    let growthPercentages = [];

    for (let i = 1; i < listMedianYears.length; i++) {
      const actualSalary = listMedianYears[i];
      const lastSalary = listMedianYears[i - 1];
      const growthPercentage = (actualSalary - lastSalary) / lastSalary;
      growthPercentages.push(growthPercentage);
    }

    const medianGrowthPercentage = PlatziMath.calculateMedian(growthPercentages);

    const lastMedian = listMedianYears[listMedianYears.length - 1];
    const newMedian = lastMedian * (1 + medianGrowthPercentage);

    return newMedian;
  }
}

function medianGeneral() {
  const medianList = salarios.map(
    item => medianPerPerson(item.name
  ));
  const median = PlatziMath.calculateMedian(medianList);

  return median;
}

function medianTop10() {
  const medianList = salarios.map(
    item => medianPerPerson(item.name
  )).sort((a,b) => b - a);

  const limit = medianList.length * 0.1;
  const top10 = [];
  for (let i = 0; i < limit; i++) {
    const element = medianList[i];
    top10.push(element);
  }
  // console.log({medianList, top10});
  return PlatziMath.calculateMedian(top10);
}
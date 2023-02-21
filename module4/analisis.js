// Análisis personal para Juanita

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

//Análisis empresarial
/*
  {
    Industrias Mokepon: {
      2018: [],
      2019: [],
    }
  }
*/
const empresas = {};

for (const persona of salarios) {
  for (const trabajo of persona.trabajos) {
    if (!empresas[trabajo.empresa]) {
      empresas[trabajo.empresa] = {};
    }
    
    if (!empresas[trabajo.empresa][trabajo.year]) {
      empresas[trabajo.empresa][trabajo.year] = [];
    }

    empresas[trabajo.empresa][trabajo.year].push(trabajo.salario)
  }
}

console.log({empresas});
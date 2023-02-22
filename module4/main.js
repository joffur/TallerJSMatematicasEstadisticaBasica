// Elementos del HTML
const personSection = document.querySelector('.person-section');


// Creación de elementos HTML
const personSelect = document.createElement('select');
salarios.forEach(item => {
  const option = document.createElement('option');
  option.innerText = item.name;
  option.value = item.name;
  personSelect.append(option);
});
personSection.append(personSelect);

const chartContainer = document.createElement('div');
chartContainer.setAttribute('id', 'chartContainer');
chartContainer.classList.add('person-section__chart-container');
personSection.append(chartContainer);

// Eventos
personSelect.addEventListener('change', selectPerson);

//Funciones
function selectPerson() {
  const namePerson = personSelect.value;
  const dataPerson = getDataPerson(namePerson);
  renderChartPerson(dataPerson);
} 

function getDataPerson(name) {
  return salarios.find(item => item.name === name);
}

function renderChartPerson(data) {
  
  const dataPoints = data.trabajos.map(item => {
    const element = {};
    element.label = item.year;
    element.y = item.salario;
    return element
  });

  console.log(dataPoints);
  var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    title:{
      text: `Estado personal de ${data.name}`
    },	
    axisY: {
      title: "Salario en dólares",
      titleFontColor: "#4F81BC",
      lineColor: "#4F81BC",
      labelFontColor: "#4F81BC",
      tickColor: "#4F81BC",
      includeZero: true,
    },	
    toolTip: {
      shared: true
    },
    data: [{
      type: "column",
      name: "Salario anual",
      showInLegend: true, 
      dataPoints: dataPoints,
    }]
  });
  chart.render();
}

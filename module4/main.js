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
  const data = salarios.find(item => item.name === name);
  data.proyeccion = parseInt(Analisis.personProjection(name));
  data.media = Analisis.medianPerPerson(name);
  return data;
}

function renderChartPerson(data) {
  //Construcción del array de los salarios
  const dataPoints = data.trabajos.map(item => {
    const element = {};
    element.label = item.year;
    element.y = item.salario;
    return element
  });

  //Agregar a los salarios la proyeccion
  dataPoints.push({ y: data.proyeccion, label: "Proyección", color: "#008080" });

  //Construcción del array de la media
  const dataAverage = data.trabajos.map(item => {
    const element = {};
    element.label = item.year;
    element.y = data.media;
    return element;
  });

  //Agregar los datos a mostrar en la gráfica
  var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    theme: "light2",
    title:{
      text: `Estado personal de ${data.name}`
    },	
    axisY: {
      title: "Salario en dólares (USD)",
      titleFontColor: "#2E8B57",
      lineColor: "#2E8B57",
      labelFontColor: "#2E8B57",
      tickColor: "#2E8B57",
      includeZero: true,
    },
    axisX: {
      title: "Año"
    },	
    toolTip: {
      shared: true
    },
    legend:{
      cursor:"pointer",
      verticalAlign: "bottom",
      itemclick: toogleDataSeries
    },
    data: [{
      type: "column",
      name: "Salario anual",
      color: "#2E8B57",
      showInLegend: false, 
      dataPoints: dataPoints,
    },
    {
      type: "line",
      showInLegend: true,
      color: "#1D3333",
      name: "Media de los salarios",
      markerType: "square",
      lineDashType: "dash",
      dataPoints: dataAverage,
    }]
  });
  chart.render();

  function toogleDataSeries(e){
    if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else{
      e.dataSeries.visible = true;
    }
    chart.render();
  }
}

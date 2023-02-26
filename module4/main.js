/*********************************/
/* Enlace con Elementos del HTML */
/*********************************/
const personSection = document.querySelector('.person-section');
const enterpriseSection = document.querySelector('.enterprise-section');
const top10Section = document.querySelector('.top10-section');

/******************************/
/* Creación de elementos HTML */
/******************************/ 

// Personas
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
chartContainer.classList.add('person-section__chart-container', 'chart-container');
chartContainer.classList.add('chart-container');
personSection.append(chartContainer);

// Empresas
const enterpriseSelect = document.createElement('select');
for (const key in Analisis.empresas) {
  const option = document.createElement('option');
  option.innerText = key;
  option.value = key;
  enterpriseSelect.append(option);
}
enterpriseSection.append(enterpriseSelect);

const chartEnterpriseContainer = document.createElement('div');
chartEnterpriseContainer.setAttribute('id', 'chartEnterpriseContainer');
chartEnterpriseContainer.classList.add('enterprise-section__chart-container', 'chart-container');
enterpriseSection.append(chartEnterpriseContainer);

// Top-10

const chartTop10Container = document.createElement('div');
chartTop10Container.setAttribute('id', 'chartTop10Container');
chartTop10Container.classList.add('top10-section__chart-container', 'chart-container');
top10Section.append(chartTop10Container);

/*****************************/
/*          Eventos          */
/*****************************/

window.onload = (event) => {
  selectPerson();
  selectEnterprise();
  drawTop10();
};
personSelect.addEventListener('change', selectPerson);
enterpriseSelect.addEventListener('change', selectEnterprise);

/*****************************/
/*        Funciones          */
/*****************************/

// Personas
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
      text: `Estado personal de "${data.name}"`
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

// Empresas

function selectEnterprise() {
  const enterpriseName = enterpriseSelect.value;
  const dataEnterprise = getDataEnterprise(enterpriseName);
  renderChartEnterprise(dataEnterprise);
}

function getDataEnterprise(name) {
  const data = {
    name: name,
  }
  //Sumatoria de salarios entregados en el año
  const totalsPerYear = [];
  for (const key in Analisis.empresas[name]) {
    const salarios = Analisis.empresas[name][key].reduce((acc,item) => acc + item, 0);
    const values = {
      year: key,
      salario: salarios,
    }
    totalsPerYear.push(values);
  }
  //Media de salarios entregados en el año
  const mediaPerYear = [];
  for (const key in Analisis.empresas[name]) {
    const salarios = Analisis.medianEnterprise(name, key);
    const values = {
      year: key,
      salario: salarios,
    }
    mediaPerYear.push(values);
  }

  data.mediaYear = mediaPerYear;
  data.totals = totalsPerYear;
  data.proyeccionMedias = parseInt(Analisis.enterpriseProjection(name, true));
  data.proyeccionTotales = parseInt(Analisis.enterpriseProjection(name, false));

  return data;
}

function renderChartEnterprise(data) {
  const dataPoints1 = data.totals.map(item => {
    const element = {};
    element.label = item.year;
    element.y = item.salario;
    return element
  });

  dataPoints1.push({ y: data.proyeccionTotales, label: "Proyección", color: "#008080" });
  
  const dataPoints2 = data.mediaYear.map(item => {
    const element = {};
    element.label = item.year;
    element.y = item.salario;
    return element
  });

  dataPoints2.push({ y: data.proyeccionMedias, label: "Proyección", color: "#63263C" });

  //Agregar los datos a mostrar en la gráfica
  var chart = new CanvasJS.Chart("chartEnterpriseContainer", {
    animationEnabled: true,
    theme: "light2",
    title:{
      text: `Estado de la empresa "${data.name}"`
    },	
    axisY: {
      title: "Salario en dólares (USD)",
      titleFontColor: "#2E8B57",
      lineColor: "#2E8B57",
      labelFontColor: "#2E8B57",
      tickColor: "#2E8B57",
      includeZero: true,
    },
    axisY2: {
      title: "Media del salario en dólares (USD)",
      titleFontColor: "#B02053",
      lineColor: "#B02053",
      labelFontColor: "#B02053",
      tickColor: "#B02053",
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
      name: "Salarios totales",
      color: "#2E8B57",
      legend: "Totales",
      showInLegend: true, 
      dataPoints: dataPoints1,
    },
    {
      type: "column",
      legend: "Medias",
      axisYType: "secondary",
      showInLegend: true,
      color: "#B02053",
      name: "Media de los salarios anuales",
      dataPoints: dataPoints2,
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

// Top-10

function drawTop10 () {
  const data = salarios.map(item => {
    const element = {};
    element.name = item.name;
    element.median = Analisis.medianPerPerson(item.name);
    return element;
  });
  data.push({name: "Media general", median: Analisis.medianGeneral(), color: "#eb6"});
  data.push({name: "Media Top 10", median: Analisis.medianTop10(), color: "#B02053" });
  data.sort((a,b) => a.median - b.median);
  renderChartTop10(data);
}

function renderChartTop10(data) {
  //Construcción del array de las medias de los  salarios
  const dataPoints = data.map(item => {
    const element = {};
    element.label = item.name;
    element.y = item.median;
    if (item.color) { element.color = item.color };
    return element
  });

  //Agregar los datos a mostrar en la gráfica
  var chart = new CanvasJS.Chart("chartTop10Container", {
    animationEnabled: true,
    theme: "light2",
    title:{
      text: "Medias generales y media del Top 10"
    },	
    axisY2: {
      title: "Salario en dólares (USD)",
      includeZero: true,
    },
    axisX: {
      // title: "Año"
      interval: 1,
    },	
    toolTip: {
      shared: true
    },
    // legend:{
    //   cursor:"pointer",
    //   verticalAlign: "bottom",
    //   itemclick: toogleDataSeries
    // },
    data: [{
      type: "bar",
      name: "Media del salario anual",
      color: "#2E8B57",
      showInLegend: false,
      axisYType: "secondary", 
      dataPoints: dataPoints,
    }]
  });
  chart.render();
}